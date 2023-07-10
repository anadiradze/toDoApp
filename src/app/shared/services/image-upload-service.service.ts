import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../models/http-model.model';
@Injectable({
  providedIn: 'root',
})
export class ImageUploadServiceService {
  constructor(private http: HttpClient) {
    
  }
  images!:string[] | undefined
  url = 'http://localhost:3004/tasks';

  postImage(task: ITask, base64String: string): Observable<any> {
    const url = `${this.url}/${task.id}`;
    const updatedTask = { ...task, images: [base64String , ...(task.images? task.images : []) ]};
    return this.http.put(url, updatedTask);
  }

}
