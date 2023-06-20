import { Injectable } from '@angular/core';
import { ITask, TaskItems } from '../models/http-model.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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
