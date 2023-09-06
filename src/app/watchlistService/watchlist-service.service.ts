import { Injectable } from '@angular/core';
import { Books } from '../json-data/books';
import { BookOfList } from '../interfaces/BookOfListInterface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistServiceService {
  allBooks: BehaviorSubject<BookOfList[]> = new BehaviorSubject<BookOfList[]>(
    [],
  );

  constructor() {
    this.getDataBooks();
  }

  //Devolvemos el array de libros a un componente
  getBooks(): Observable<BookOfList[]> {
    return this.allBooks.asObservable();
  }

  setBooks(books: BookOfList[]): void {
    this.allBooks.next(books);
  }

  //Obtenemos el array de libros al inicializar la web
  getDataBooks(): void {
    let booksArray: BookOfList[] = [];
    let booksLocalStorageString: string | null = localStorage.getItem('books');
    let booksLocalStorage: BookOfList[] =
      booksLocalStorageString !== null
        ? JSON.parse(booksLocalStorageString)
        : [];
    if (booksLocalStorage.length !== 0) {
      this.allBooks.next(booksLocalStorage);
      return;
    }
    for (const bookData of Books.library) {
      let newBook: BookOfList = {
        book: bookData.book,
        isInWatchlist: false,
      };
      booksArray.push(newBook);
    }
    this.allBooks.next(booksArray);
    let booksString = JSON.stringify(booksArray);
    localStorage.setItem('books', booksString);
  }

  changeStorage() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'books') {
        const booksString = event.newValue;
        if (booksString !== null) {
          const books: BookOfList[] = JSON.parse(booksString);
          this.setBooks(books);
        }
      }
    });
  }
}
