import { Component } from '@angular/core';
import { filter, switchMap, throwError } from 'rxjs';
import { Endpoints, ITask } from 'src/app/models/http-model.model';
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
  title = this.rotationService.newStatusEnum
  
  ngOnInit(): void {
    this.httpService.event.pipe(
      filter((res: any) => res === Endpoints.New || res === Endpoints.Default),
      switchMap((res) => {
        if (res) {
          console.log('getTasks called')
          return this.httpService.getTasks(Endpoints.New)
        }
        return throwError(() => new Error(''))
      })).subscribe(
        (taskList: ITask[]) => {
          this.newTasks = taskList
        }
      )
  }
}
