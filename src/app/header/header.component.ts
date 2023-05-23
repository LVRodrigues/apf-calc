import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Project } from '../model/project';
import { ApfService } from '../apf.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  title: string;
  score: number;
  project: Project;

  constructor(app: AppComponent, apf: ApfService) {
    this.title = app.title;
    this.score = app.score;
    this.project = apf.project;
  }
}
