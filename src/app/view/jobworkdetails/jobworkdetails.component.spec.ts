import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobworkdetailsComponent } from './jobworkdetails.component';

describe('JobworkdetailsComponent', () => {
  let component: JobworkdetailsComponent;
  let fixture: ComponentFixture<JobworkdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobworkdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobworkdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
