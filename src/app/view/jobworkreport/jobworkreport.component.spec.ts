import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobworkreportComponent } from './jobworkreport.component';

describe('JobworkreportComponent', () => {
  let component: JobworkreportComponent;
  let fixture: ComponentFixture<JobworkreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobworkreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobworkreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
