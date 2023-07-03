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

  yellow: string = 'rgb(240, 175, 83)';
  red: string = 'rgb(226, 68, 92)';
  green: string = 'rgb(0, 200, 117)';
  grey: string = 'rgb(196, 196, 196)';
}
