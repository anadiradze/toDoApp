import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  showModal = false;
  editModeisOn = false;
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
}
