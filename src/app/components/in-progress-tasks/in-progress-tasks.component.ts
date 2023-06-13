import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Endpoints, ITask } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { RotationServiceService } from 'src/app/services/rotation-service.service';

@Component({
  selector: 'app-in-progress-tasks',
  templateUrl: './in-progress-tasks.component.html',
  styleUrls: ['./in-progress-tasks.component.css']
})
export class InProgressTasksComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService
    ) { }

  inProgressTasks: ITask[] = []
  title = this.rotationService.inProgressStatusEnum

  ngOnInit(): void {
    this.httpService.event.pipe(filter((res: any) => res === Endpoints.InProgress || res === Endpoints.Default), switchMap((res) => {
      if (res) {
        return this.httpService.getTasks(Endpoints.InProgress)
      }
      return throwError(() => new Error(''))
    })).subscribe(
      (taskList: ITask[]) => {
        this.inProgressTasks = taskList
      }
    )
  }
}
