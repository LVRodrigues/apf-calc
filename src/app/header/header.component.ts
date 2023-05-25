import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Project } from '../model/project';
import { ApfService } from '../apf.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    title: string;
    project: Project;

    constructor(
        app: AppComponent,
        apf: ApfService,
        private router: Router) {
        this.title = app.title;
        this.project = apf.project;
    }

    canShow(): boolean {
        return !(this.router.url === '/home' || this.router.url === '/properties')
    }
}
