import { Component, OnInit } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Endpoints, ITask } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { RotationServiceService } from 'src/app/services/rotation-service.service';

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
      tap(()=>console.log('isDataChanged$ called before switchmap')),
      switchMap(() => {
        return this.httpService.getTasks()
      })
    );

    this.newTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === Endpoints.New
        );
      })
    );
    this.inProgressTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === Endpoints.InProgress
        );
      })
    );

    this.doneTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === Endpoints.Done
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
}
