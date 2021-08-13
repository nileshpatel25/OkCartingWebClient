import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobworkComponent } from './jobwork.component';

describe('JobworkComponent', () => {
  let component: JobworkComponent;
  let fixture: ComponentFixture<JobworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
