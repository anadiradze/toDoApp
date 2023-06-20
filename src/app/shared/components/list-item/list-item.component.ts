import { Component, Input, OnInit } from '@angular/core';
import { TaskItems, ITask } from 'src/app/shared/models/http-model.model';
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
  isExpanded = false;

  @Input() taskItems: ITask[] | null = [];

  newStatusEnum = this.rotationService.newStatusEnum;
  inProgressStatusEnum = this.rotationService.inProgressStatusEnum;
  doneStatusEnum = this.rotationService.doneStatusEnum;

  deleteTask(id: number) {
    this.httpService.deleteTask(id).subscribe((res) => {
      this.httpService.refreshData = true;
    });
  }

  changeTaskStatus(targetTask: ITask, newStatus: TaskItems): void {
    this.httpService.changeStatus(targetTask, newStatus).subscribe({
      next: () => {
        this.httpService.refreshData = true;
      },
      error: () => {},
    });
  }

  onDragStart(event: DragEvent, id: number | undefined) {
    event.dataTransfer?.setData('id', `${id}`);
  }
  onEdit(event: Event) {}
}
