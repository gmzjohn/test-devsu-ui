import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovement } from './edit-movement';

describe('EditMovement', () => {
  let component: EditMovement;
  let fixture: ComponentFixture<EditMovement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMovement],
    }).compileComponents();

    fixture = TestBed.createComponent(EditMovement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
