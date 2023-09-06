import { Component } from '@angular/core';
import { BookOfList } from '../../interfaces/BookOfListInterface';
import { WatchlistServiceService } from '../../watchlistService/watchlist-service.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent {
  allBooks: BookOfList[];
  booksOfList: BookOfList[];

  constructor(private watchlistService: WatchlistServiceService) {
    this.allBooks = [];
    this.booksOfList = [];
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.watchlistService.changeStorage();
    console.log('Watchlist component renderizado');
  }

  getAllBooks(): void {
    this.watchlistService.getBooks().subscribe((books) => {
      this.allBooks = books;
      this.booksOfList = this.allBooks.slice();
      this.booksOfList = this.booksOfList.filter((book) => book.isInWatchlist);
    });
  }

  changeStateBook(id: number, isInWatchlist: boolean) {
    this.booksOfList[id].isInWatchlist = isInWatchlist;
    this.watchlistService.setBooks(this.allBooks);
    let booksString = JSON.stringify(this.allBooks);
    localStorage.setItem('books', booksString);
  }
}
