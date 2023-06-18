import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelreportComponent } from './fuelreport.component';

describe('FuelreportComponent', () => {
  let component: FuelreportComponent;
  let fixture: ComponentFixture<FuelreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
