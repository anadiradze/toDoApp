import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask, ITaskList } from '../models/http-model.model';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3004/tasks'
  
  getTasks(): Observable<ITaskList> {
    return this.http.get<ITaskList>(this.url);
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.url, task);
  }

  deleteTask(id: number): Observable<ITask> {
    return this.http.delete<ITask>(`${this.url}/${id}`);
  }

  updateTask(id: number, task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.url}/${id}`, task);
  }
}



