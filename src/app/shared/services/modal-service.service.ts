import { Injectable } from '@angular/core';
import { ITask } from '../models/http-model.model';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  tasks!: ITask[];
  index!: number;
  showModal = false;
  editModeisOn = false;
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
}
