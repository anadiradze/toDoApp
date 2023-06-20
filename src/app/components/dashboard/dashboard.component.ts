import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, filter, map, switchMap, tap } from 'rxjs';
import { TaskItems, ITask } from 'src/app/shared/models/http-model.model';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { RotationServiceService } from 'src/app/shared/services/rotation-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private modalService: ModalServiceService,
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService
  ) {}

  newStatusEnum = this.rotationService.newStatusEnum;
  inProgressStatusEnum = this.rotationService.inProgressStatusEnum;
  doneStatusEnum = this.rotationService.doneStatusEnum;

  allTasks$!: Observable<ITask[]>;
  newTasks$!: Observable<ITask[]>;
  inProgressTasks$!: Observable<ITask[]>;
  doneTasks$!: Observable<ITask[]>;

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.allTasks$ = this.httpService.isDataChanged$.pipe(
      switchMap((res) => {
        return this.httpService.getTasks();
      })
    );

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
  showModal() {
    this.modalService.openModal();
  }
  isModalServiceVisible(): boolean {
    return this.modalService.showModal;
  }

  onDrop(event: DragEvent, newStatus: TaskItems) {
    event.preventDefault();
    this.httpService
      .getTaskById(+event.dataTransfer?.getData('id')!)
      .pipe(
        filter((task: ITask) => task.status !== newStatus),
        concatMap((task) => {
          return this.httpService.changeStatus(task, newStatus);
        }),
        tap(() => {
          this.httpService.refreshData = true;
        })
      )
      .subscribe();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}
