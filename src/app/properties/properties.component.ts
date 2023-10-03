import { Component, Input } from '@angular/core';
import { Project } from '../model/project';
import { ApfService } from '../apf.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

    project: Project;

    constructor(
        private apf: ApfService,
        private router: Router
    ) {
        this.project                = new Project();
        this.project.name           = this.apf.project.name;
        this.project.description    = this.apf.project.description;
        this.project.date           = this.apf.project.date;
        this.project.responsible    = this.apf.project.responsible;
        this.project.score          = this.apf.project.score;
        this.project.version        = this.apf.project.version;
    }

    confirm(): void {
        this.apf.project.name           = this.project.name;
        this.apf.project.description    = this.project.description;
        this.apf.project.responsible    = this.project.responsible;
        this.navigateBack();
    }

    cancel(): void {
        this.navigateBack();
    }

    private navigateBack() {
        this.router.navigate(['home']);
    }
}
