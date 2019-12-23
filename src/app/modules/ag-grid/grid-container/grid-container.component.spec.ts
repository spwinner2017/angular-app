import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridContainerComponent } from './grid-container.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

describe('GridContainerComponent', () => {
  let component: GridContainerComponent;
  let fixture: ComponentFixture<GridContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,
        AgGridModule.withComponents([])],
      declarations: [ GridContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
