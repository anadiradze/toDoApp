import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskStatus, ITask } from '../models/http-model.model';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  event: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3004/'
  /* 
    getTasks(status: string): Observable<any> {
      return this.http.get<any>(this.url + status);
    }
  
    addTask(task: any): Observable<any> {
      return this.http.post<any>(this.url + task.status, task);
    } */
  getTasks(status: TaskStatus): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + status);
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.url + task.status, task);
  }

  deleteTask(id: number, status: TaskStatus): Observable<ITask> {
    return this.http.delete<ITask>(`${this.url + status}/${id}`);
  }

  updateTask(status: TaskStatus, task: ITask): Observable<ITask> {
    const url = `${this.url + status + '/' + task.id}`;
    return this.http.put<ITask>(url, task);
  }
}



