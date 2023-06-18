import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversalarylistComponent } from './driversalarylist.component';

describe('DriversalarylistComponent', () => {
  let component: DriversalarylistComponent;
  let fixture: ComponentFixture<DriversalarylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversalarylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversalarylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
