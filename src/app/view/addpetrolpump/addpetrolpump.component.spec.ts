import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpetrolpumpComponent } from './addpetrolpump.component';

describe('AddpetrolpumpComponent', () => {
  let component: AddpetrolpumpComponent;
  let fixture: ComponentFixture<AddpetrolpumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpetrolpumpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpetrolpumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
