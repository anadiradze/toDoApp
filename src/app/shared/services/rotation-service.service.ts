import { Injectable } from '@angular/core';
import { TaskItems } from '../models/http-model.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root',
})
export class RotationServiceService {
  constructor(private httpService: HttpServiceService) {}

  private refreshData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  set refreshData(refreshStatus: boolean) {
    this.refreshData$.next(refreshStatus);
  }

  get isDataChanged$(): Observable<boolean> {
    return this.refreshData$.asObservable();
  }

  getTasks() {
    return this.httpService.getTasks().pipe(
      map((res) => {
        res.sort((a, b) => {
          return b.priority - a.priority;
        });
        return res; // Return the sorted array
      })
    );
  }
  
  DefaultStatusEnum: TaskItems = TaskItems.Default;
  newStatusEnum: TaskItems = TaskItems.New;
  inProgressStatusEnum: TaskItems = TaskItems.InProgress;
  doneStatusEnum: TaskItems = TaskItems.Done;

  yellow: string = 'rgb(240, 175, 83)';
  red: string = 'rgb(226, 68, 92)';
  green: string = 'rgb(0, 200, 117)';
  grey: string = 'rgb(196, 196, 196)';
}
