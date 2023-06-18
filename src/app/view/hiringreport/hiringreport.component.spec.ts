import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringreportComponent } from './hiringreport.component';

describe('HiringreportComponent', () => {
  let component: HiringreportComponent;
  let fixture: ComponentFixture<HiringreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
