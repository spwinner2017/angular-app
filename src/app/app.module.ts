import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header-component/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar-component/sidebar-component';
import { AppViewComponent } from './views/app-view/app-view-component/app-view.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.mudule';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    AppViewComponent,
    BreadcrumbComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    SharedModule,
    HttpClientModule
    
  ],
  providers: [],
  exports:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
