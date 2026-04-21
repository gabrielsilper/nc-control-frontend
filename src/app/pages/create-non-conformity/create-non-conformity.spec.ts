import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNonConformity } from './create-non-conformity';

describe('CreateNonConformity', () => {
  let component: CreateNonConformity;
  let fixture: ComponentFixture<CreateNonConformity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNonConformity],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNonConformity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
