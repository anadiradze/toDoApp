import { Component, Input } from '@angular/core';
import { ITask } from 'src/app/models/http-model.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {
  @Input() taskItems: ITask[] = []
}
