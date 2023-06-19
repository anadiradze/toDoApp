import { Component, OnInit } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Endpoints, ITask } from 'src/app/shared/models/http-model.model';
import { DragAndDropServiceService } from 'src/app/shared/services/drag-and-drop-service.service';
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
    private rotationService: RotationServiceService,
    private dragAndDropService: DragAndDropServiceService
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

  onDropAccordingStatus(event: DragEvent, newStatus: Endpoints) {
    this.dragAndDropService.onDrop(event, newStatus);
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}
