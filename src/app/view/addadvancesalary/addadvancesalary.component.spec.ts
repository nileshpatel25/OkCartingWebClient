import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddadvancesalaryComponent } from './addadvancesalary.component';

describe('AddadvancesalaryComponent', () => {
  let component: AddadvancesalaryComponent;
  let fixture: ComponentFixture<AddadvancesalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddadvancesalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddadvancesalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
