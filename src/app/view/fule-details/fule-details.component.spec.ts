import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuleDetailsComponent } from './fule-details.component';

describe('FuleDetailsComponent', () => {
  let component: FuleDetailsComponent;
  let fixture: ComponentFixture<FuleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
