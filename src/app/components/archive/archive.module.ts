/* import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArchiveComponent } from './archive.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'archive',
    component: ArchiveComponent,
  },
];

@NgModule({
  declarations: [ArchiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [ArchiveComponent],
})
export class ArchiveModule {}
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchiveComponent } from './archive.component';
import { BoardListComponent } from './board-list/board-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes = [
  {
    path: '',
    component: ArchiveComponent,
  },
];
@NgModule({
  declarations: [ArchiveComponent, BoardListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ArchiveModule {}
