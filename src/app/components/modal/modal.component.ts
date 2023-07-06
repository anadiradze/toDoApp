import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskItems, ITask } from 'src/app/shared/models/http-model.model';
import { Subject, takeUntil } from 'rxjs';
import { RotationServiceService } from 'src/app/shared/services/rotation-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  modalForm!: FormGroup;
  @Input() taskToEdit!: ITask;
  editModeisOn = this.modalService.editModeisOn;

  maxNumOfCharacters: number = 70;

  //modalService
  index: number = this.modalService.index;
  length: number = this.modalService.tasks.length;

  //priorities
  priorities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  statuses: TaskItems[] = [TaskItems.New, TaskItems.InProgress, TaskItems.Done];

  //task status enums
  newStatusEnum = this.rotationService.newStatusEnum;
  inProgressStatusEnum = this.rotationService.inProgressStatusEnum;
  doneStatusEnum = this.rotationService.doneStatusEnum;

  constructor(
    private modalService: ModalServiceService,
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    this.initModalForm();
  }

  initModalForm() {
    this.modalForm = new FormGroup({
      name: new FormControl(this.taskToEdit?.title, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      priority: new FormControl(this.taskToEdit?.priority),
      status: new FormControl(this.taskToEdit?.status),
      description: new FormControl(this.taskToEdit?.description),
    });
  }

  get nameControl() {
    return this.modalForm.get('name') as FormControl;
  }
  get priorityControl() {
    return this.modalForm.get('priority') as FormControl;
  }
  get statusControl() {
    return this.modalForm.get('status') as FormControl;
  }
  get descriptionControl() {
    return this.modalForm.get('description') as FormControl;
  }

  // add task when user adds the task
  addTask() {
    const task: ITask = {
      title: this.nameControl.value,
      status: this.statusControl.value,
      priority: this.priorityControl.value,
      description: this.descriptionControl.value,
    };
    this.httpService
      .addTask(task)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.rotationService.refreshData = true;
        this.modalService.closeModal();
      });
  }

  // update task when user edits the task
  updateTask() {
    this.httpService
      .UpdateTask({
        ...this.taskToEdit,
        title: this.nameControl.value,
        priority: this.priorityControl.value,
        status: this.statusControl.value,
        description: this.descriptionControl.value,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.rotationService.refreshData = true;
        this.modalService.closeModal();
      });
  }

  // get to the next/previous task in edit mode
  previousTask(event: Event) {
    if (this.index + 1 === this.length) {
      this.index = -1;
    }
    this.taskToEdit = this.modalService.tasks[(this.index += 1)];
    this.initModalForm();
    event.stopPropagation();
  }

  nextTask(event: Event) {
    if (this.index - 1 < 0) {
      this.index = this.length;
    }
    this.taskToEdit = this.modalService.tasks[(this.index -= 1)];
    this.initModalForm();
    event.stopPropagation();
  }

  // change icon colors according to task list
  getIconSource(taskToEdit: ITask, side: string): string {
    return taskToEdit.status === this.newStatusEnum
      ? `../../../assets/red${side}.png`
      : taskToEdit.status === this.inProgressStatusEnum
      ? `../../../assets/yellow${side}.png`
      : taskToEdit.status === this.doneStatusEnum
      ? `../../../assets/green${side}.png`
      : '';
  }

  //prevent event bubbling - when user clicks backdrop modal closes, when user clicks on the modal itself, modal is still open
  onModalClick(event: MouseEvent) {
    event.stopPropagation();
  }

  //close the modal on backdrop click and on cancel click
  closeModal() {
    this.modalService.closeModal();
  }
}
