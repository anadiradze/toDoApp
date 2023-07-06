import { Injectable } from '@angular/core';
import { ITask, TaskItems } from '../models/http-model.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpServiceService } from './http-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChangesServiceService {
  constructor(
    private httpService: HttpServiceService,
    private http: HttpClient
  ) {}
  url = this.httpService.url;
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
  UpdateTask(task: ITask): Observable<any> {
    const url = `${this.url}/${task.id}`;
    return this.http.put(url, task);
  }
  changeStatus(task: ITask, newStatus: TaskItems | string): Observable<any> {
    const url = `${this.url}/${task.id}`;
    const updatedTask = { ...task, status: newStatus };
    return this.http.put(url, updatedTask);
  }
  changePriority(task: ITask, newPriority: number): Observable<any> {
    const url = `${this.url}/${task.id}`;
    const updatedTask = { ...task, priority: newPriority };
    return this.http.put(url, updatedTask);
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
