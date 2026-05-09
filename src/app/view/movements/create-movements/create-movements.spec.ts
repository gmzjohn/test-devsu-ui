import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMovements } from './create-movements';

describe('CreateMovements', () => {
  let component: CreateMovements;
  let fixture: ComponentFixture<CreateMovements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMovements],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMovements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
