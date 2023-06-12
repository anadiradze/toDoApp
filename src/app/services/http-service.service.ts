import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Endpoints, ITask } from '../models/http-model.model';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  event: BehaviorSubject<Endpoints> = new BehaviorSubject<Endpoints>(Endpoints.Default);

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3004/'
  /* 
    getTasks(status: string): Observable<any> {
      return this.http.get<any>(this.url + status);
    }
  
    addTask(task: any): Observable<any> {
      return this.http.post<any>(this.url + task.status, task);
    } */
  getTasks(status: Endpoints): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url + status);
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.url + task.status, task)
  }

  deleteTask(id: number, status: Endpoints): Observable<ITask> {
    return this.http.delete<ITask>(`${this.url + status}/${id}`);
  }

  updateTask(status: Endpoints, task: ITask): Observable<ITask> {
    const url = `${this.url + status + '/' + task.id}`;
    return this.http.put<ITask>(url, task);
  }
}



