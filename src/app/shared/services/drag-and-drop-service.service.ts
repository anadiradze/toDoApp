import { Injectable } from '@angular/core';
import { filter, concatMap, tap } from 'rxjs';
import { Endpoints, ITask } from '../models/http-model.model';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root',
})
export class DragAndDropServiceService {
  constructor(private httpService: HttpServiceService) {}

  onDrop(event: DragEvent, newStatus: Endpoints) {
    event.preventDefault();
    this.httpService
      .getTaskById(+event.dataTransfer?.getData('id')!)
      .pipe(
        filter((task: ITask) => task.status !== newStatus),
        concatMap((task) => {
          return this.httpService.changeStatus(task, newStatus);
        }),
        tap(() => {
          this.httpService.refreshData = true;
        })
      )
      .subscribe();
  }
}
