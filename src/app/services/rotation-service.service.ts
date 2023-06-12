import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, tap } from 'rxjs';
import { HttpServiceService } from './http-service.service';
import { Endpoints, ITask } from '../models/http-model.model';

@Injectable({
  providedIn: 'root'
})
export class RotationServiceService {

  constructor(
    private httpService: HttpServiceService
  ){}
  
  changeStatus(targetTask: ITask, newStatus: Endpoints) {
    this.httpService.deleteTask(targetTask.id!, targetTask.status).pipe(
      tap(() => this.httpService.event.next(targetTask.status)
      ),
      concatMap(() => { return this.httpService.addTask({ title: targetTask.title, status: newStatus }) }),
      tap(() => this.httpService.event.next(newStatus)
      ),
    ).subscribe(() => {
    })
  }
}
