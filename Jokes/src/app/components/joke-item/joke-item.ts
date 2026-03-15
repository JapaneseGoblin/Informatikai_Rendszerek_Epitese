import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Joke } from '../../../joke.model';

@Component({
  selector: 'app-joke-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './joke-item.html',
  styleUrl: './joke-item.css'
})
export class JokeItemComponent {
  @Input() joke!: Joke;
  @Output() voted = new EventEmitter<{ id: number; type: 'like' | 'dislike' }>();

  vote(type: 'like' | 'dislike') {
    this.voted.emit({ id: this.joke.id, type });
  }

  get score(): number {
    return this.joke.likes - this.joke.dislikes;
  }

  get isApproved(): boolean {
    return this.score >= 50;
  }

  get lines(): string[] {
    return this.joke.text.split('\n');
  }
}