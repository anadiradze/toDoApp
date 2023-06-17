import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { Endpoints, ITask } from '../models/http-model.model';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  event: BehaviorSubject<Endpoints> = new BehaviorSubject<Endpoints>(Endpoints.Default);
  private refreshData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  set refreshData(refreshStatus: boolean) {
    this.refreshData$.next(refreshStatus)
  }



  get isDataChanged$(): Observable<boolean> {
    return this.refreshData$.asObservable();
  }


  constructor(private http: HttpClient) { }
  url = 'http://localhost:3004/tasks'
  /* 
    getTasks(status: string): Observable<any> {
      return this.http.get<any>(this.url + status);
    }
  
    addTask(task: any): Observable<any> {
      return this.http.post<any>(this.url + task.status, task);
    } */
  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url);
  }


  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.url, task)
  }

  deleteTask(id: number): Observable<ITask> {
    return this.http.delete<ITask>(`${this.url}/${id}`);
  }

  updateTask(status: Endpoints, task: ITask): Observable<ITask> {
    const url = `${this.url + status + '/' + task.id}`;
    return this.http.put<ITask>(url, task);
  }
}



