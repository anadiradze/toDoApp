import { Component, Input, OnInit } from '@angular/core';
import { Endpoints, ITask } from 'src/app/models/http-model.model';
import { RotationServiceService } from 'src/app/shared/services/rotation-service.service';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent implements OnInit {
  constructor(
    private rotationService: RotationServiceService
    ) {}
  @Input() title!: Endpoints;
  ngOnInit(): void {}
  newStatusEnum = this.rotationService.newStatusEnum;
  inProgressStatusEnum = this.rotationService.inProgressStatusEnum;
  doneStatusEnum = this.rotationService.doneStatusEnum;

  yellow: string = 'rgb(240, 175, 83)';
  red: string = 'rgb(226, 68, 92)';
  green: string = 'rgb(0, 200, 117)';
  grey: string = 'rgb(196, 196, 196)';
  
 
}
