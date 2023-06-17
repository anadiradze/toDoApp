import { Component, Input, OnInit } from '@angular/core';
//import { Observable } from 'rxjs';
import { Endpoints, ITask } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { RotationServiceService } from 'src/app/services/rotation-service.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService) {

  }

  ngOnInit(): void {
  }

  @Input() taskItems: ITask[] = []




  newStatusEnum = this.rotationService.newStatusEnum
  inProgressStatusEnum = this.rotationService.inProgressStatusEnum
  doneStatusEnum = this.rotationService.doneStatusEnum


  deleteTask(id: number) {
    this.httpService.deleteTask(id).subscribe((res) => {
      this.httpService.refreshData = true
    })
  }

  // log(targetTask: ITask, newStatus: Endpoints) {
  //   targetTask.status = newStatus
  //   this.httpService.refreshData = true
  // }

  changeTaskStatus(targetTask: ITask, newStatus: Endpoints): void {
    this.httpService.changeStatus(targetTask, newStatus)
      .subscribe({
        next: response => {
          this.httpService.refreshData = true
          console.log('Task status changed successfully:', response);
          // Handle success response
        },
        error: error => {
          console.error('Error updating task status:', error);
          // Handle error response
        }
      });

  }
}
