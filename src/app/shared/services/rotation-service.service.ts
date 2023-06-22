import { Injectable } from '@angular/core';
import { TaskItems } from '../models/http-model.model';

@Injectable({
  providedIn: 'root',
})
export class RotationServiceService {
  constructor() {}

  DefaultStatusEnum: TaskItems = TaskItems.Default;
  newStatusEnum: TaskItems = TaskItems.New;
  inProgressStatusEnum: TaskItems = TaskItems.InProgress;
  doneStatusEnum: TaskItems = TaskItems.Done;
}
