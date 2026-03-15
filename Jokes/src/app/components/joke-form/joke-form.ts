import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-joke-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './joke-form.html',
  styleUrl: './joke-form.css'
})
export class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<{ username: string; text: string }>();

  username = '';
  text = '';

  submitJoke() {
    if (!this.username.trim() || !this.text.trim()) return;

    this.jokeCreated.emit({
      username: this.username.trim(),
      text: this.text.trim()
    });

    this.username = '';
    this.text = '';
  }
}