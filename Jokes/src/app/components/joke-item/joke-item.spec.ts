import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeItem } from './joke-item';

describe('JokeItem', () => {
  let component: JokeItem;
  let fixture: ComponentFixture<JokeItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
