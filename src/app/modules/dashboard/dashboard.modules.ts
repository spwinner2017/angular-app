
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CustomAutocompleteComponent } from 'src/app/shared/components/custom-autocomplete/custom-autocomplete.component';
import { SharedModule } from 'src/app/shared/shared.mudule';
import { EventListComponent } from './event-list/event-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardContainerComponent,
    EventListComponent
  ],
  imports: [
    CommonModule ,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap:[DashboardContainerComponent]
})
export class DashboardModule { }
