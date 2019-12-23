import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridContainerComponent } from './grid-container/grid-container.component';

const routes: Routes = [
  {
    path: '',
    component: GridContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridRoutingModule { }
