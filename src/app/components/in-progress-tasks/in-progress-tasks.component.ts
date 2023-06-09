import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ITask, TaskStatus } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-in-progress-tasks',
  templateUrl: './in-progress-tasks.component.html',
  styleUrls: ['./in-progress-tasks.component.css']
})
export class InProgressTasksComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService) { }

    inProgressTasks: ITask[] = []

  ngOnInit(): void {
    this.httpService.event.pipe(switchMap(() => this.httpService.getTasks(TaskStatus.InProgress))).subscribe(
      (taskList: ITask[]) => {
        this.inProgressTasks = taskList
      }
    )
  }
}
