import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book, BOOKS_LIST, Genre } from '../_data/books';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  books = BOOKS_LIST;

  isFormVisible = false;

  genreOptions = Object.values(Genre);


  newBook = this.defaultBook();

  deleteBook(book: Book) {
    const confirmed = confirm(`Are you sure you want to delete "${book.title}"?`);

    if (confirmed) {
      this.books = this.books.filter(b => b.id !== book.id);
    }
  }

  defaultBook(): Book {
    return {
      id: 0,
      title: '',
      author: '',
      genre: Genre.Fiction,
      pages: 100,
      price: 3000,
      inStock: true
    };
  }

  saveBook() {
    this.newBook.id = this.books.length > 0
      ? Math.max(...this.books.map(b => b.id)) + 1
      : 1;

    this.books.push({ ...this.newBook });
    this.newBook = this.defaultBook();
    this.isFormVisible = false;
  }
}