import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeForm } from './joke-form';

describe('JokeForm', () => {
  let component: JokeForm;
  let fixture: ComponentFixture<JokeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
