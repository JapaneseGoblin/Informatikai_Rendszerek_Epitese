import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Joke } from '../joke.model';
import { JokeFormComponent } from './components/joke-form/joke-form';
import { JokeListComponent } from './components/joke-list/joke-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, JokeFormComponent, JokeListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  jokes: Joke[] = [
    {
      id: 1,
      username: 'Teszt Matyi',
      text: `Mi az aratás sikeres befejezése?\n ???\n Kaszasiker.`,
      likes: 50,
      dislikes: 0
    },
    {
      id: 2,
      username: 'Kovács Béla',
      text: `Mi áll meg hő hatására?\n???\nA lovaskocsi.\n???\nHőőő!`,
      likes: 156,
      dislikes: 128
    },
    {
      id: 3,
      username: 'Joker Lajos',
      text: `Mondj egy olyan szót, amiben benne van a Titanic!\n???\nÓceán.`,
      likes: 256,
      dislikes: 128
    }
  ];

  addJoke(newJoke: { username: string; text: string }) {
    const joke: Joke = {
      id: Date.now(),
      username: newJoke.username,
      text: newJoke.text,
      likes: 0,
      dislikes: 0
    };

    this.jokes.unshift(joke);
  }

  vote(data: { id: number; type: 'like' | 'dislike' }) {
    const joke = this.jokes.find(j => j.id === data.id);
    if (!joke) return;

    if (data.type === 'like') {
      joke.likes++;
    } else {
      joke.dislikes++;
    }
  }

  get totalLikes(): number {
    return this.jokes.reduce((sum, joke) => sum + joke.likes, 0);
  }

  get totalDislikes(): number {
    return this.jokes.reduce((sum, joke) => sum + joke.dislikes, 0);
  }

  get totalVotes(): number {
    return this.totalLikes + this.totalDislikes;
  }
}