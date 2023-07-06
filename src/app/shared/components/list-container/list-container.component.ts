import { Component, Input, OnInit } from '@angular/core';
import { TaskItems } from 'src/app/shared/models/http-model.model';
import { ChangesServiceService } from 'src/app/shared/services/changes-service.service';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent implements OnInit {
  constructor(private changesService: ChangesServiceService) {}
  @Input() title!: TaskItems;
  ngOnInit(): void {}

  newStatusEnum = this.changesService.newStatusEnum;
  inProgressStatusEnum = this.changesService.inProgressStatusEnum;
  doneStatusEnum = this.changesService.doneStatusEnum;

}
