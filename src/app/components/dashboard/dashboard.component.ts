import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, concatMap, takeUntil } from 'rxjs';
import { ITask } from 'src/app/shared/models/http-model.model';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { ChangesServiceService } from 'src/app/shared/services/changes-service.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FilterTasksService } from 'src/app/shared/services/filter-tasks.service';

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
    private changesService: ChangesServiceService,
    private filterTasks: FilterTasksService
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  defaultStatusEnum = this.changesService.DefaultStatusEnum;
  newStatusEnum = this.changesService.newStatusEnum;
  inProgressStatusEnum = this.changesService.inProgressStatusEnum;
  doneStatusEnum = this.changesService.doneStatusEnum;

  allTasks$!: Observable<ITask[]>;
  newTasks$!: Observable<ITask[]>;
  inProgressTasks$!: Observable<ITask[]>;
  doneTasks$!: Observable<ITask[]>;

  // get all the tasks when app starts
  ngOnInit(): void {
    this.filterTasks.getTasks();
    this.initFilteredTasks();
  }

  initFilteredTasks() {
    this.allTasks$ = this.filterTasks.allTasks$;
    this.newTasks$ = this.filterTasks.newTasks$;
    this.inProgressTasks$ = this.filterTasks.inProgressTasks$;
    this.doneTasks$ = this.filterTasks.doneTasks$;
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
      targetPriority < 10
        ? this.sameArrayPriorityChange(draggedItem, targetPriority)
        : this.sameArrayPriorityChange(draggedItem, targetPriority - 1);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      targetPriority < 10
        ? this.otherArrayPriorityChange(
            event,
            anotherArrDraggedItem,
            anotherArrTargetPriority
          )
        : this.otherArrayPriorityChange(
            event,
            anotherArrDraggedItem,
            anotherArrTargetPriority - 1
          );
    }
  }

  //change the priority of dragged task onDrop in the same list task is located
  sameArrayPriorityChange(draggedItem: ITask, targetPriority: number) {
    this.changesService
      .changePriority(draggedItem, targetPriority)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.changesService.refreshData = true;
      });
  }

  //change the priority of dragged task onDrop in other list and change its status accordingly
  otherArrayPriorityChange(
    event: CdkDragDrop<ITask[]>,
    anotherArrDraggedItem: ITask,
    anotherArrTargetPriority: number
  ) {
    this.changesService
      .changeStatus(
        anotherArrDraggedItem,
        event.container.element.nativeElement.id // id of list - (inprogress,done,new)
      )
      .pipe(
        takeUntil(this.destroy$),
        concatMap((task) => {
          return this.changesService.changePriority(
            task,
            anotherArrTargetPriority
          );
        })
      )
      .subscribe(() => {
        this.changesService.refreshData = true;
      });
  }

  //clear the input value on addTask. E.x After user clicks edit task2 and then clicks addTask, input value still has task2 as a value. So it becomes clean after this operation.
  openModalOnAddTask() {
    this.modalService.openModal();
    this.task = {
      status: this.defaultStatusEnum,
      title: '',
      priority: null!,
      description: '',
    };
    this.modalService.editModeisOn = false;
  }

  receiveTaskInDashboard(task: ITask) {
    this.task = task;
  }
}
