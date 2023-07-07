import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ITask } from '../models/http-model.model';
@Injectable({
  providedIn: 'root',
})
export class ImageUploadServiceService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3004/tasks';

  postImage(task: ITask, base64String: string): Observable<any> {
    const url = `${this.url}/${task.id}`;
    const updatedTask = { ...task, image: base64String };
    return this.http.put(url, updatedTask);
  }
}
