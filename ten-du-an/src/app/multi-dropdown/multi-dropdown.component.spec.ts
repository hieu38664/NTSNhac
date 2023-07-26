import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDropdownComponent } from './multi-dropdown.component';

describe('MultiDropdownComponent', () => {
  let component: MultiDropdownComponent;
  let fixture: ComponentFixture<MultiDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiDropdownComponent]
    });
    fixture = TestBed.createComponent(MultiDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
