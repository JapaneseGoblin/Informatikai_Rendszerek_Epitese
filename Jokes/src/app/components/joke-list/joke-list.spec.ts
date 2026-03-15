import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeList } from './joke-list';

describe('JokeList', () => {
  let component: JokeList;
  let fixture: ComponentFixture<JokeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
