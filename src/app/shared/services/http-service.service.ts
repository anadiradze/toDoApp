import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskItems, ITask } from '../models/http-model.model';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  
  private refreshData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  set refreshData(refreshStatus: boolean) {
    this.refreshData$.next(refreshStatus);
  }

  get isDataChanged$(): Observable<boolean> {
    return this.refreshData$.asObservable();
  }

  constructor(private http: HttpClient) {}
  url = 'http://localhost:3004/tasks';

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url);
  }

  getTaskById(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.url}/${id}`);
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.url, task);
  }

  deleteTask(id: number): Observable<ITask> {
    return this.http.delete<ITask>(`${this.url}/${id}`);
  }

  changeStatus(task: ITask, newStatus: TaskItems): Observable<any> {
    const url = `${this.url}/${task.id}`;
    const updatedTask = { ...task, status: newStatus };
    return this.http.put(url, updatedTask);
  }

  UpdateTask(task: ITask): Observable<any> {
    const url = `${this.url}/${task.id}`;
    return this.http.put(url, task);
  }
}
