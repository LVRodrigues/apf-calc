import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  title: string;
  score: number;

  constructor(app: AppComponent) {
    this.title = app.title;
    this.score = app.score;
  }
}
