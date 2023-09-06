import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'BOOK_LIST';
  showAllBooks: boolean = true;

  changeShowAllBooks(param: boolean): void {
    this.showAllBooks = param;
  }

  ngOnInit() {
    console.log('App root se renderiza');
  }
}
