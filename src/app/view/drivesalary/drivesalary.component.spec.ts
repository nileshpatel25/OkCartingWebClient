import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivesalaryComponent } from './drivesalary.component';

describe('DrivesalaryComponent', () => {
  let component: DrivesalaryComponent;
  let fixture: ComponentFixture<DrivesalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivesalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivesalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
