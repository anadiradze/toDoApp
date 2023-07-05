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
  @Input() taskToEdit!: ITask;
  destroy$: Subject<boolean> = new Subject<boolean>();
  modalForm!: FormGroup;
  editModeisOn = this.modalService.editModeisOn;
  maxNumOfCharacters: number = 70;
  //priorities
  priorities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  statuses: TaskItems[] = [TaskItems.New, TaskItems.InProgress, TaskItems.Done];

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
        this.httpService.refreshData = true;
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
        this.httpService.refreshData = true;
        this.modalService.closeModal();
      });
  }

  //prevent event bubbling - when user clicks backdrop modal closes, when user clicks on the modal itself, modal is still open
  onModalClick(event: MouseEvent) {
    event.stopPropagation();
  }
  //close the modal on backdrop click and on cancel click
  closeModal() {
    this.modalService.closeModal();
  }
  newStatusEnum = this.rotationService.newStatusEnum;
  inProgressStatusEnum = this.rotationService.inProgressStatusEnum;
  doneStatusEnum = this.rotationService.doneStatusEnum;
}
