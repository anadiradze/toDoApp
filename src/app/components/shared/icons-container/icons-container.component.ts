import { Component, Input, OnInit } from '@angular/core';
import { ITask, TaskStatus } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-icons-container',
  templateUrl: './icons-container.component.html',
  styleUrls: ['./icons-container.component.css']
})
export class IconsContainerComponent implements OnInit {
  @Input() targetItem!: ITask
  targetId?: number
  targetStatus? : TaskStatus


  constructor(
    private httpService: HttpServiceService,
  ) { }
  ngOnInit(): void {
    this.targetId = this.targetItem.id
    this.targetStatus =this.targetItem.status
  }

  deleteTask(id: number, status: TaskStatus) {
    this.httpService.deleteTask(id, status).subscribe((res) => {
      this.httpService.event.next(true)
      console.log
    })
  }


}


