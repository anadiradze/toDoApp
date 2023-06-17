import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Endpoints, ITask } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { RotationServiceService } from 'src/app/services/rotation-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private modalService: ModalServiceService,
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService,
  ) { }

  allTasks: ITask[] = []
  newTasks: ITask[] = []
  inProgressTasks: ITask[] = []
  doneTasks: ITask[] = []

  ngOnInit(): void {
    this.getTasks()
  }
  
  getTasks() {
    this.httpService.isDataChanged$.pipe(
      switchMap(() => {
        return this.httpService.getTasks()
      })
    ).subscribe({
      next: (AllTasksFromService: ITask[]) => {
        this.allTasks = AllTasksFromService
        this.initArrays()
      }
    })

  }
  initArrays() {
    this.allTasks.forEach((task) => {

      if (task.status === Endpoints.New) {
        this.newTasks = [...this.newTasks, task]
      }
      else if (task.status === Endpoints.InProgress) {
        this.inProgressTasks = [...this.inProgressTasks, task]
      }
      else if (task.status === Endpoints.Done) {
        this.doneTasks = [...this.doneTasks, task]
      }
    })
  }
  showModal() {
    this.modalService.openModal()
    console.log(this.newTasks, "newTasks")
  }
  isModalServiceVisible(): boolean {
    return this.modalService.showModal;
  }
}
