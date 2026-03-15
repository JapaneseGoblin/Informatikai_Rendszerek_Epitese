import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Joke } from '../../../joke.model';
import { JokeItemComponent } from '../joke-item/joke-item';

@Component({
  selector: 'app-joke-list',
  standalone: true,
  imports: [CommonModule, JokeItemComponent],
  templateUrl: './joke-list.html',
  styleUrl: './joke-list.css'
})
export class JokeListComponent {
  @Input() jokes: Joke[] = [];
  @Input() totalLikes = 0;
  @Input() totalDislikes = 0;
  @Input() totalVotes = 0;

  @Output() voted = new EventEmitter<{ id: number; type: 'like' | 'dislike' }>();

  onVote(data: { id: number; type: 'like' | 'dislike' }) {
    this.voted.emit(data);
  }
}