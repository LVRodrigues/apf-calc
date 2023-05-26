import { Component } from '@angular/core';
import { Module } from '../model/module';
import { ApfService } from '../apf.service';

@Component({
    selector: 'app-modules',
    templateUrl: './modules.component.html',
    styleUrls: ['./modules.component.scss']
})
export class ModulesComponent {

    modules: Module[];

    constructor(apf: ApfService) {
        this.modules = apf.project.modules;
    }
}
