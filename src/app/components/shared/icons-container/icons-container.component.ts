import { Component, Input, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-icons-container',
  templateUrl: './icons-container.component.html',
  styleUrls: ['./icons-container.component.css']
})
export class IconsContainerComponent  {
  @Input() targetId!: number
  @Input() targetStatus!: string
  
  constructor(private httpService: HttpServiceService) { }

  deleteTask(id: number, status: string) {
    this.httpService.deleteTask(id, status).subscribe()
  }

}


