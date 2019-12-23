import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomcellDropdownComponent } from './customcell-dropdown.component';

describe('CustomcellDropdownComponent', () => {
  let component: CustomcellDropdownComponent;
  let fixture: ComponentFixture<CustomcellDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomcellDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomcellDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
