import { Component } from '@angular/core';
import { BookOfList } from '../../interfaces/BookOfListInterface';
import { WatchlistServiceService } from '../../watchlistService/watchlist-service.service';
import { Categories } from '../../json-data/categories';
import { Filter } from '../../interfaces/FilterInterface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  filter: Filter;
  categories = Categories;
  sliderValue: number;
  allBooks: BookOfList[];
  books: BookOfList[];

  constructor(private watchlistService: WatchlistServiceService) {
    this.sliderValue = 0;
    this.allBooks = [];
    this.books = [];
    this.filter = { genreId: '0', minPages: 0 };
    this.updateSliderValue();
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.watchlistService.changeStorage();
  }

  getAllBooks(): void {
    this.watchlistService.getBooks().subscribe((books) => {
      this.allBooks = books;
      this.books = this.allBooks.slice();
      this.filterBooks();
    });
  }

  changeStateBook(id: number, isInWatchlist: boolean) {
    this.books[id].isInWatchlist = isInWatchlist;
    this.watchlistService.setBooks(this.allBooks);
    let booksString = JSON.stringify(this.allBooks);
    localStorage.setItem('books', booksString);
  }

  filterCategory(event: Event) {
    this.filter.genreId = (event.target as HTMLSelectElement).value;
    this.filterBooks();
  }

  updateSliderValue() {
    this.sliderValue = Math.min(Math.max(this.sliderValue, 0), 2000);
    this.filter.minPages = this.sliderValue;
    this.filterBooks();
  }

  filterBooks() {
    this.books = this.allBooks.slice();
    if (this.filter.genreId !== '0') {
      this.books = this.books.filter(
        (dataBook) =>
          dataBook.book.genre === this.categories[this.filter.genreId],
      );
    }
    this.books = this.books.filter(
      (dataBook) => dataBook.book.pages >= this.filter.minPages,
    );
  }
}
