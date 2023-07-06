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

}
