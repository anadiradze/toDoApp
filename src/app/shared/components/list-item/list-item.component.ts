import { Component, Input, OnInit } from '@angular/core';
import { Endpoints, ITask } from 'src/app/shared/models/http-model.model';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { RotationServiceService } from 'src/app/shared/services/rotation-service.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService
  ) {}

  ngOnInit(): void {}

  @Input() taskItems: ITask[] | null = [];

  newStatusEnum = this.rotationService.newStatusEnum;
  inProgressStatusEnum = this.rotationService.inProgressStatusEnum;
  doneStatusEnum = this.rotationService.doneStatusEnum;

  deleteTask(id: number) {
    this.httpService.deleteTask(id).subscribe((res) => {
      this.httpService.refreshData = true;
    });
  }

  changeTaskStatus(targetTask: ITask, newStatus: Endpoints): void {
    this.httpService.changeStatus(targetTask, newStatus).subscribe({
      next: (response) => {
        this.httpService.refreshData = true;
      },
      error: (error) => {},
    });
  }

  onDragStart(event: DragEvent, id: number | undefined) {
    console.log('drag:' ,event.target)
    event.dataTransfer?.setData('id', `${id}`);
    
  }
}
