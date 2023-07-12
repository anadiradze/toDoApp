import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../models/http-model.model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  constructor(private http: HttpClient) {}

  url = environment.baseUrl;

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url);
  }

  getTaskById(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.url}/${id}`);
  }

  add(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.url, task);
  }

  delete(id: number): Observable<ITask> {
    return this.http.delete<ITask>(`${this.url}/${id}`);
  }
  put(updatedTask: ITask) {
    return this.http.put(`${this.url}/${updatedTask.id}`, updatedTask);
  }
}
