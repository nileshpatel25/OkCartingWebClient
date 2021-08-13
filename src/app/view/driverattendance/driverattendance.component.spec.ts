import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverattendanceComponent } from './driverattendance.component';

describe('DriverattendanceComponent', () => {
  let component: DriverattendanceComponent;
  let fixture: ComponentFixture<DriverattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverattendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
