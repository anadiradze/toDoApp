import { Component, Input, OnInit } from '@angular/core';
import { Endpoints, ITask } from 'src/app/models/http-model.model';
import { RotationServiceService } from 'src/app/services/rotation-service.service';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit {
  constructor(
    private rotationService: RotationServiceService
  ) {}
  @Input() listTitle!: Endpoints
  ngOnInit(): void {

  }



}
