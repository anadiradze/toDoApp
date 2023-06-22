import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { FormControl } from '@angular/forms';
import { TaskItems, ITask } from 'src/app/shared/models/http-model.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  taskNameControl: FormControl = new FormControl('');
  radioButtonsControl: FormControl = new FormControl('');

  taskToEdit!: ITask;
  editModeisOn = this.modalService.editModeisOn;
  //priorities
  priorities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // implement setter on Input(). when Input editTask changes function in setter is updated immediately.
  @Input() set editTask(taskToEdit: ITask) {
    this.taskToEdit = taskToEdit;
    this.taskNameControl.patchValue(this.taskToEdit.title);
    this.radioButtonsControl.patchValue(Math.floor(this.taskToEdit.priority));
  }

  constructor(
    private modalService: ModalServiceService,
    private httpService: HttpServiceService
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {}

  // add task when user adds the task
  addTask() {
    const task: ITask = {
      title: this.taskNameControl.value,
      status: TaskItems.New,
      priority: this.radioButtonsControl.value,
    };
    this.httpService
      .addTask(task)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.httpService.refreshData = true;
      });
    this.modalService.closeModal();
  }

  // update task when user edits the task
  updateTask() {
    this.httpService
      .UpdateTask({
        ...this.taskToEdit,
        title: this.taskNameControl.value,
        priority: this.radioButtonsControl.value,
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
}
