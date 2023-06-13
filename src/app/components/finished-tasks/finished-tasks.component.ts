import { Component } from '@angular/core';
import { filter, switchMap, throwError } from 'rxjs';
import { Endpoints, ITask } from 'src/app/models/http-model.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { RotationServiceService } from 'src/app/services/rotation-service.service';

@Component({
  selector: 'app-finished-tasks',
  templateUrl: './finished-tasks.component.html',
  styleUrls: ['./finished-tasks.component.css']
})
export class FinishedTasksComponent {
  constructor(
    private httpService: HttpServiceService,
    private rotationService: RotationServiceService
  ) { }

  finishedTasks: ITask[] = []
  title = this.rotationService.doneStatusEnum


  ngOnInit(): void {
    this.httpService.event.pipe(filter((res: any) => res === Endpoints.Done || res === Endpoints.Default), switchMap((res) => {
      if (res) {
        return this.httpService.getTasks(Endpoints.Done)
      }
      return throwError(() => new Error(''))
    })).subscribe(
      (taskList: ITask[]) => {
        this.finishedTasks = taskList
      }
    )
  }
}
