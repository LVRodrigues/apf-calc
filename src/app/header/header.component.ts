import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Project } from '../model/project';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  title: string;
  score: number;
  project: Project;

  constructor(app: AppComponent) {
    this.title = app.title;
    this.score = app.score;
    this.project = new Project();
  }
}
