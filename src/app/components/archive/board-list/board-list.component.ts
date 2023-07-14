import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/shared/models/http-model.model';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
})
export class BoardListComponent implements OnInit {
  @Input() doneTask!: ITask;
  ngOnInit(): void {
    console.log(this.doneTask, 'this.doneTask from boardlist');
  }
}
