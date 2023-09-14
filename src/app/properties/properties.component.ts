import { Component, Input } from '@angular/core';
import { Project } from '../model/project';
import { ApfService } from '../apf.service';

@Component({
    selector: 'app-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

    @Input() project: Project;

    constructor(private apf: ApfService) {
        this.project = apf.project;
    }
}
