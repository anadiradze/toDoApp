import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/shared/models/http-model.model';
import { FilterTasksService } from 'src/app/shared/services/filter-tasks.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  constructor(private filterTasks: FilterTasksService) {}
  doneTasks$!: Observable<ITask[]>;
  archivedTasks: Observable<ITask[]>[] = [];
  
  ngOnInit(): void {
    this.filterTasks.getTasks();
    this.doneTasks$ = this.filterTasks.doneTasks$;
    this.initTasksArray();
  }
  initTasksArray() {
    this.archivedTasks = [this.filterTasks.doneTasks$];
  }
}
