import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  constructor() {}
  showModal = false;
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
}
