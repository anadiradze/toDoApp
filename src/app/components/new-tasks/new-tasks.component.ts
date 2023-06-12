import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { ITask, TaskStatus } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { RotationServiceService } from 'src/app/services/rotation-service.service';

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.css']
})
export class NewTasksComponent {
  constructor(private httpService: HttpServiceService,
    private rotationService: RotationServiceService) { }

  /*
    newTasks: any
   ngOnInit(): void {
      this.newTasks = this.httpService.event.pipe(switchMap(() => this.httpService.getTasks('new')))
    } */

  newTasks: ITask[] = []

  ngOnInit(): void {
    this.httpService.event.pipe(switchMap(() => this.httpService.getTasks(TaskStatus.New))).subscribe(
      (taskList: ITask[]) => {
        this.newTasks = taskList
        this.httpService.updateTask(TaskStatus.InProgress,{...this.newTasks[0], status: TaskStatus.New}).subscribe( ()=>{
          console.log(
            {...this.newTasks[0]},"...this.newTasks[0]"
          )
        })
      }
    )
  }
}
