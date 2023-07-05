import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItems, ITask } from '../models/http-model.model';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
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
}
