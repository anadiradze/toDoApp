import { Component } from '@angular/core';
import { LoggerServiceService } from './shared/services/logger-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'toDoApp';
  constructor(private loggerService: LoggerServiceService) {
    this.loggerService.disableLogsinProd();
  }
}
