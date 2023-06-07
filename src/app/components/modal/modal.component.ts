import { Component } from '@angular/core';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FormControl } from '@angular/forms';
import { ITask } from 'src/app/models/http-model.model';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(
    private modalService: ModalServiceService,
    private httpService: HttpServiceService,
  ) { }

  taskNameControl: FormControl = new FormControl('');


  addTask() {
    const task: ITask = { title: this.taskNameControl.value, status: "new" }
    this.httpService.addTask(task).subscribe();
    this.modalService.closeModal()
  }
  cancel() {
    this.modalService.closeModal()
  }

  //close the modal on backdrop click
  onBackdropClick() {
    this.modalService.closeModal()
  }
  onModalClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
