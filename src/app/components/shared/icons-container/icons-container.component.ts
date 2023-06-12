import { Component, Input, OnInit } from '@angular/core';
import { Endpoints, ITask } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { RotationServiceService } from 'src/app/services/rotation-service.service';

@Component({
  selector: 'app-icons-container',
  templateUrl: './icons-container.component.html',
  styleUrls: ['./icons-container.component.css']
})
export class IconsContainerComponent implements OnInit {
  @Input() targetItem!: ITask
  targetId?: number
  targetStatus?: Endpoints

  constructor(
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService
  ) { }
  ngOnInit(): void {
    this.targetId = this.targetItem.id
    this.targetStatus = this.targetItem.status
  }

  deleteTask(id: number, status: Endpoints) {
    this.httpService.deleteTask(id, status).subscribe((res) => {
       this.httpService.event.next(status);
    })
  }

  moveToInProgress() {
    this.rotationService.changeStatus(this.targetItem, Endpoints.InProgress)
  }
}


