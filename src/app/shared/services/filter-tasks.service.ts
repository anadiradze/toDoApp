import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { ITask, TaskItems } from '../models/http-model.model';
import { ChangesServiceService } from './changes-service.service';

@Injectable({
  providedIn: 'root',
})
export class FilterTasksService {
  constructor(private changesService: ChangesServiceService) {}
  
  allTasks$!: Observable<ITask[]>;
  newTasks$!: Observable<ITask[]>;
  inProgressTasks$!: Observable<ITask[]>;
  doneTasks$!: Observable<ITask[]>;

  getTasks() {
    this.allTasks$ = this.changesService.isDataChanged$.pipe(
      switchMap((res) => {
        return this.changesService.getTasks();
      })
    );

    // filter the allTasks observable to implement async pipes according to task statuses.
    this.newTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === TaskItems.New
        );
      })
    );
    this.inProgressTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === TaskItems.InProgress
        );
      })
    );
    this.doneTasks$ = this.allTasks$.pipe(
      map((AllTasksFromService: ITask[]) => {
        return AllTasksFromService.filter(
          (task) => task.status === TaskItems.Done
        );
      })
    );
  }
}
