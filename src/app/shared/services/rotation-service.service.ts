import { Injectable } from '@angular/core';
import { concatMap, tap } from 'rxjs';
import { HttpServiceService } from './http-service.service';
import { Endpoints, ITask } from '../models/http-model.model';

@Injectable({
  providedIn: 'root'
})
export class RotationServiceService {

  constructor(
    private httpService: HttpServiceService
  ) { }


  DefaultStatusEnum: Endpoints = Endpoints.Default
  newStatusEnum: Endpoints = Endpoints.New
  inProgressStatusEnum: Endpoints = Endpoints.InProgress
  doneStatusEnum: Endpoints = Endpoints.Done


 // changeStatus(targetTask: ITask, newStatus: Endpoints) {
  
    // this.httpService.deleteTask(targetTask.id!).pipe(
    //   tap(() => this.httpService.event.next(targetTask.status)
    //   ),
    //   concatMap(() => { return this.httpService.addTask({ title: targetTask.title, status: newStatus }) }),
    //   tap(() => this.httpService.event.next(newStatus)
    //   ),
    // ).subscribe(() => {
    // })
  //}
}
