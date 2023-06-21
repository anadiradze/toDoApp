import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskItems, ITask } from 'src/app/shared/models/http-model.model';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { RotationServiceService } from 'src/app/shared/services/rotation-service.service';
import { ModalServiceService } from '../../services/modal-service.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  @Output() onEdit: EventEmitter<ITask> = new EventEmitter<ITask>();
  constructor(
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService,
    private modalService: ModalServiceService
  ) {}

  ngOnInit(): void {}
  @Input() taskItems: ITask[] | null = [];
  @Input() taskItem!: ITask;

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

  onDragStart(event: DragEvent, id: number | undefined, index: number) {
    event.dataTransfer?.setData('id', `${id}`);
    event.dataTransfer?.setData('index', `${index}`);
  }

  // Create eventemitter to emit the task object to modal component in order to change existing task.
  @Output() moveTaskToDashboard: EventEmitter<ITask> =
    new EventEmitter<ITask>();

  editTask(task: ITask) {
    this.moveTaskToDashboard.emit(task);
    this.modalService.openModal();
    this.modalService.editModeisOn = true;
  }
  floorPriority(priority: number): number {
    return Math.floor(priority);
  }
}
