import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCellRenderComponent } from './custom-cell-render.component';

describe('CustomCellRenderComponent', () => {
  let component: CustomCellRenderComponent;
  let fixture: ComponentFixture<CustomCellRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCellRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
