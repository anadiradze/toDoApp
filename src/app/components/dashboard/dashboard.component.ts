import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  concatMap,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';
import { TaskItems, ITask } from 'src/app/shared/models/http-model.model';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { RotationServiceService } from 'src/app/shared/services/rotation-service.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  task!: ITask;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private modalService: ModalServiceService,
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  defaultStatusEnum = this.rotationService.DefaultStatusEnum;
  newStatusEnum = this.rotationService.newStatusEnum;
  inProgressStatusEnum = this.rotationService.inProgressStatusEnum;
  doneStatusEnum = this.rotationService.doneStatusEnum;

  allTasks$!: Observable<ITask[]>;
  newTasks$!: Observable<ITask[]>;
  inProgressTasks$!: Observable<ITask[]>;
  doneTasks$!: Observable<ITask[]>;

  // get all the tasks when app starts
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.allTasks$ = this.httpService.isDataChanged$.pipe(
      switchMap((res) => {
        return this.httpService.getTasks();
      })
    );

    // filter the allTasks observable to implement async pipes according to task statuses.
    this.newTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === TaskItems.New
        );
      })
    );
    this.inProgressTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === TaskItems.InProgress
        );
      })
    );
    this.doneTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === TaskItems.Done
        );
      })
    );
  }

  // modal pops-up conditionally according to isModalServiceVisible is true or false.
  isModalServiceVisible(): boolean {
    return this.modalService.showModal;
  }
  // drop logic, when user drops task to another place priority changes according to its below/upper task priority.
  drop(event: CdkDragDrop<ITask[]>) {
    const draggedItem = event.container.data[event.previousIndex];
    const targetPriority =
      event.container.data[event.currentIndex].priority + 1;
    const anotherArrDraggedItem =
      event.previousContainer.data[event.previousIndex];
    const anotherArrTargetPriority =
      event.container.data[event.currentIndex].priority + 1;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.sameArrayPriorityChange(draggedItem, targetPriority);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.otherArrayPriorityChange(
        event,
        anotherArrDraggedItem,
        anotherArrTargetPriority
      );
    }
  }

  //change the priority of dragged task onDrop in the same list task is located
  sameArrayPriorityChange(draggedItem: ITask, targetPriority: number) {
    this.httpService
      .changePriority(draggedItem, targetPriority)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.httpService.refreshData = true;
      });
  }

  //change the priority of dragged task onDrop in other list and change its status accordingly
  otherArrayPriorityChange(
    event: CdkDragDrop<ITask[]>,
    anotherArrDraggedItem: ITask,
    anotherArrTargetPriority: number
  ) {
    this.httpService
      .changeStatus(
        anotherArrDraggedItem,
        event.container.element.nativeElement.id // id of list - (inprogress,done,new)
      )
      .pipe(
        takeUntil(this.destroy$),
        concatMap((task) => {
          return this.httpService.changePriority(
            task,
            anotherArrTargetPriority
          );
        })
      )
      .subscribe(() => {
        this.httpService.refreshData = true;
      });
  }

  //clear the input value on addTask. E.x After user clicks edit task2 and then clicks addTask, input value still has task2 as a value. So it becomes clean after this operation.
  openModalOnAddTask() {
    this.modalService.openModal();
    this.task = {
      status: this.defaultStatusEnum,
      title: '',
      priority: null!,
    };
    this.modalService.editModeisOn = false;
  }

  receiveTaskInDashboard(task: ITask) {
    this.task = task;
  }
}
