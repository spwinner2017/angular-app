import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContainerComponent } from './dashboard-container.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

describe('DashboardContainerComponent', () => {
  let component: DashboardContainerComponent;
  let fixture: ComponentFixture<DashboardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule,
        AgGridModule.withComponents([])],
      declarations: [ DashboardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
