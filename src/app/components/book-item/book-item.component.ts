import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../interfaces/BookOfLibraryInterface';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent {
  @Input() book!: Book;
  @Input() isInWatchlist!: boolean;
  @Input() isInWatchlistComponent: boolean = true;
  @Output() clickEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  onClick(watchlistEvent: boolean) {
    this.clickEvent.emit(watchlistEvent);
  }
}
