import { Component } from '@angular/core';
import { ITask } from 'src/app/models/http-model.model';
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
    this.httpService.getTasks('done').subscribe(
      (taskList: ITask[]) => {
        this.finishedTasks = taskList
      }
    )
  }
}
