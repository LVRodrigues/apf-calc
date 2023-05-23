import { Component } from '@angular/core';
import { Project } from '../model/project';
import { ApfService } from '../apf.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    project: Project;

    constructor(apf: ApfService) {
        this.project = apf.project;
    }
}
