import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContainerComponent } from './components/list-container/list-container.component';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  declarations: [ListContainerComponent, ListItemComponent],
  imports: [CommonModule],
  exports: [ListContainerComponent, ListItemComponent],
})
export class SharedModule {}
