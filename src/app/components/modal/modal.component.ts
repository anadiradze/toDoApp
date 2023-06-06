import { Component } from '@angular/core';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(private modalService: ModalServiceService) { }
  addTask() {
    this.modalService.closeModal()
  }
  cancel() {
    this.modalService.closeModal()
  }
}
