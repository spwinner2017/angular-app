import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppViewComponent } from './views/app-view/app-view-component/app-view.component';
const routes: Routes = [
  {
    path: '',
    component: AppViewComponent,
    children: [
      { path: '', loadChildren: './modules/dashboard/dashboard.modules#DashboardModule' },
      { path: 'grid', loadChildren: './modules/ag-grid/grid.module#GridModule' }
    ],
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
