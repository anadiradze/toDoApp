import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../models/http-model.model';
import { HttpServiceService } from './http-service.service';
@Injectable({
  providedIn: 'root',
})
export class ImageUploadServiceService {
  constructor(
    private http: HttpClient,
    private httpService: HttpServiceService
  ) {}
  images!: string[] | undefined;

  postImage(task: ITask, base64String: string): Observable<any> {
    const updatedTask = {
      ...task,
      images: [base64String, ...(task.images ? task.images : [])],
    };
    return this.httpService.put(updatedTask);
  }
}
