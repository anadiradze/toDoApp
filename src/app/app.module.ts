import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTasksComponent } from './components/new-tasks/new-tasks.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListContainerComponent } from './components/shared/list-container/list-container.component';
import { ListItemComponent } from './components/shared/list-item/list-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NewTasksComponent,
    DashboardComponent,
    ListContainerComponent,
    ListItemComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
