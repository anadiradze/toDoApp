import { Injectable } from '@angular/core';
import { concatMap, tap } from 'rxjs';
import { HttpServiceService } from './http-service.service';
import { TaskItems, ITask } from '../models/http-model.model';

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
