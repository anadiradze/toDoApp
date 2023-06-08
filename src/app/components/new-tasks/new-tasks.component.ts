import { Component, Input } from '@angular/core';
import { switchMap } from 'rxjs';
import { ITask } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.css']
})
export class NewTasksComponent {
  constructor(private httpService: HttpServiceService) { }
  newTasks: ITask[] = []

  ngOnInit(): void {
    this.httpService.event.pipe(switchMap(() => this.httpService.getTasks('new')))
    .subscribe(
      (taskList: ITask[]) => {
        this.newTasks = taskList
      }
    )
  }
}
