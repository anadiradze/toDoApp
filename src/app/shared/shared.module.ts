import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContainerComponent } from './components/list-container/list-container.component';
import { ListItemComponent } from './components/list-item/list-item.component';

// Import your shared components here
;

@NgModule({
  declarations: [
    // List your shared components here
    ListContainerComponent,
    ListItemComponent
    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListContainerComponent,
    ListItemComponent
    // Export the shared components to make them accessible to other modules
   
  ]
})
export class SharedModule { }