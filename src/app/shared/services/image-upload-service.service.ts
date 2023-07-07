import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ITask } from '../models/http-model.model';
@Injectable({
  providedIn: 'root',
})
export class ImageUploadServiceService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  url = 'http://localhost:3004/tasks';

  postImage(task: ITask, base64String: string): Observable<any> {
    const url = `${this.url}/${task.id}`;
    const updatedTask = { ...task, image: base64String };
    return this.http.put(url, updatedTask);
  }
  convertBase64ToImage(base64String: string): SafeUrl {
    const imageData = `${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageData);
  }

  fetchImage(id: number | undefined): Observable<any> {
    return this.http.get(`http://localhost:3004/images/${id}`);
  }

  /*   getImages() {
    this.http.get('http://localhost:3004/images').subscribe({
      next: (data) => {
        console.log('GET request response:', data);
        // Handle the retrieved data as needed
      },
      error: (error) => {
        console.error('Error retrieving images:', error);
      },
    });
  }

  getImagebyId(imageId: number) {
    const url = `http://localhost:3004/images/${imageId}`;

    this.http.get(url).subscribe({
      next: (data) => {
        console.log('GET request response:', data);
        // Handle the retrieved data as needed
      },
      error: (error) => {
        console.error('Error retrieving image:', error);
      },
    });
  } */
}
