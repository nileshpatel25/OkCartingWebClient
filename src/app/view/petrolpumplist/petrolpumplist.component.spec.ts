import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolpumplistComponent } from './petrolpumplist.component';

describe('PetrolpumplistComponent', () => {
  let component: PetrolpumplistComponent;
  let fixture: ComponentFixture<PetrolpumplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetrolpumplistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrolpumplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
