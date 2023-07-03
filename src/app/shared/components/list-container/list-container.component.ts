import { Component, Input, OnInit } from '@angular/core';
import { TaskItems } from 'src/app/shared/models/http-model.model';
import { RotationServiceService } from 'src/app/shared/services/rotation-service.service';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent implements OnInit {
  constructor(private rotationService: RotationServiceService) {}
  @Input() title!: TaskItems;
  ngOnInit(): void {}

  newStatusEnum = this.rotationService.newStatusEnum;
  inProgressStatusEnum = this.rotationService.inProgressStatusEnum;
  doneStatusEnum = this.rotationService.doneStatusEnum;

}
