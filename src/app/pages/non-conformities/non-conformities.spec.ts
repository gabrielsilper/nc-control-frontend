import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformities } from './non-conformities';

describe('NonConformities', () => {
  let component: NonConformities;
  let fixture: ComponentFixture<NonConformities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonConformities],
    }).compileComponents();

    fixture = TestBed.createComponent(NonConformities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
