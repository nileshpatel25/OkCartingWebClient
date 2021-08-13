import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancesalarylistComponent } from './advancesalarylist.component';

describe('AdvancesalarylistComponent', () => {
  let component: AdvancesalarylistComponent;
  let fixture: ComponentFixture<AdvancesalarylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancesalarylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancesalarylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
