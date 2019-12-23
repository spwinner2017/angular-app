import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelleditingContainerComponent } from './cellediting-container.component';

describe('CelleditingContainerComponent', () => {
  let component: CelleditingContainerComponent;
  let fixture: ComponentFixture<CelleditingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelleditingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelleditingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
