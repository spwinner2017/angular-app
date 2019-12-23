import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowGroupingComponent } from './row-grouping.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('RowGroupingComponent', () => {
  let component: RowGroupingComponent;
  let fixture: ComponentFixture<RowGroupingComponent>;
  let gridEl: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        AgGridModule.withComponents([]),
        HttpClientModule],
      providers: [],
      declarations: [RowGroupingComponent]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RowGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    gridEl = fixture.debugElement.query(By.css('.ag-theme-balham'));
  });
  it('grouping should create', () => {
    expect(component).toBeTruthy();
  });
  it('grid ready state', () => {
    console.log('gridEl',gridEl);
    gridEl.triggerEventHandler('gridReady', null);
    fixture.detectChanges();
      expect(component).toBeTruthy();
  });
});
