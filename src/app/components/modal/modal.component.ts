import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { FormControl } from '@angular/forms';
import { TaskItems, ITask } from 'src/app/shared/models/http-model.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  taskToEdit!: ITask;

  editModeisOn = this.modalService.editModeisOn;

  // implement setter on Input(). when Input editTask changes function in setter is updated immediately.
  @Input() set editTask(taskToEdit: ITask) {
    this.taskToEdit = taskToEdit;
    this.taskNameControl.patchValue(this.taskToEdit.title);
  }

  constructor(
    private modalService: ModalServiceService,
    private httpService: HttpServiceService
  ) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}

  taskNameControl: FormControl = new FormControl('');

  // add task when user adds the task
  addTask() {
    const task: ITask = {
      title: this.taskNameControl.value,
      status: TaskItems.New,
    };
    this.httpService.addTask(task).subscribe(() => {
      this.httpService.refreshData = true;
    });
    this.modalService.closeModal();
  }

  // update task when user edits the task
  updateTask() {
    this.httpService
      .UpdateTask({ ...this.taskToEdit, title: this.taskNameControl.value })
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
