import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTasksComponent } from './components/new-tasks/new-tasks.component';
import { InProgressTasksComponent } from './components/in-progress-tasks/in-progress-tasks.component';
import { FinishedTasksComponent } from './components/finished-tasks/finished-tasks.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListContainerComponent } from './components/shared/list-container/list-container.component';
import { ListItemComponent } from './components/shared/list-item/list-item.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTasksComponent,
    InProgressTasksComponent,
    FinishedTasksComponent,
    DashboardComponent,
    ListContainerComponent,
    ListItemComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
