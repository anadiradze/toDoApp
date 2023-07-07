import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TaskItems, ITask } from 'src/app/shared/models/http-model.model';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { ChangesServiceService } from 'src/app/shared/services/changes-service.service';
import { ModalServiceService } from '../../services/modal-service.service';
import { Subject, takeUntil } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { ImageUploadServiceService } from '../../services/image-upload-service.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  ellipsis: boolean = true;
  @Input() newTasks!: ITask[];
  @Input() index!: number;
  @Output() onEdit: EventEmitter<ITask> = new EventEmitter<ITask>();
  constructor(
    private httpService: HttpServiceService,
    private changesService: ChangesServiceService,
    private modalService: ModalServiceService,
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {

  }
  @Input() taskItems: ITask[] | null = [];
  @Input() taskItem!: ITask;
  newStatusEnum = this.changesService.newStatusEnum;
  inProgressStatusEnum = this.changesService.inProgressStatusEnum;
  doneStatusEnum = this.changesService.doneStatusEnum;

  deleteTask(id: number) {
    this.httpService
      .deleteTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.changesService.refreshData = true;
      });
  }

  changeTaskStatus(targetTask: ITask, newStatus: TaskItems): void {
    this.changesService
      .changeStatus(targetTask, newStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.changesService.refreshData = true;
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
    this.modalService.tasks = this.newTasks;
    this.modalService.index = this.index;
    this.moveTaskToDashboard.emit(task);
    this.modalService.openModal();
    this.modalService.editModeisOn = true;
  }

  toggleEllipsisClass() {
    this.ellipsis = !this.ellipsis;
  }
}
