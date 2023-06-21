import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, filter, map, switchMap, tap } from 'rxjs';
import { TaskItems, ITask } from 'src/app/shared/models/http-model.model';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { RotationServiceService } from 'src/app/shared/services/rotation-service.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  task!: ITask;

  constructor(
    private modalService: ModalServiceService,
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService
  ) {}

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
        )
        // .sort((a, b) => {
        //   return b.priority - a.priority;
        // });
      }),

    );
    this.inProgressTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === TaskItems.InProgress
        )
        // .sort((a, b) => {
        //   return b.priority - a.priority;
        // });
      }),
    
    );
    this.doneTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === TaskItems.Done
        )
        // .sort((a, b) => {
        //   return b.priority - a.priority;
        // });
      }),

    );
  }

  // modal pops-up conditionally according to isModalServiceVisible is true or false.
  isModalServiceVisible(): boolean {
    return this.modalService.showModal;
  }

  //  changeStatus when drop task-item to the list-container
  // onDrop(event: DragEvent, newStatus: TaskItems) {
  //   event.preventDefault();
  //   const id = +event.dataTransfer?.getData('id')!;
  //   const index = +event.dataTransfer?.getData('index')!;

  //   const $taskItem = this.httpService.getTaskById(id);
  //   $taskItem
  //     .pipe(
  //       //filter((task: ITask) => task.status !== newStatus),
  //       concatMap((task) => {
  //         return this.httpService.changeStatus(task, newStatus);
  //       }),
  //       tap(() => {
  //         this.httpService.refreshData = true;
  //         console.log('index', index);
  //       })
  //     )
  //     .subscribe((res) => {});
  // }

  // onDragOver(event: DragEvent) {
  //   event.preventDefault();
  // }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.container.data[event.currentIndex].priority,'currentIndex')
      console.log(event.container.data[event.previousIndex].priority,'previousIndex')

    }
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
