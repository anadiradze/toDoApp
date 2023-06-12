import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { ITask, TaskStatus } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-finished-tasks',
  templateUrl: './finished-tasks.component.html',
  styleUrls: ['./finished-tasks.component.css']
})
export class FinishedTasksComponent {
  constructor(private httpService: HttpServiceService) { }

  finishedTasks: ITask[] = []

  ngOnInit(): void {
    this.httpService.event.pipe(switchMap(() => this.httpService.getTasks(TaskStatus.Done))).
      subscribe(
        (taskList: ITask[]) => {
          this.finishedTasks = taskList
        }
      )
  }
}
