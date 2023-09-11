import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApfService } from 'src/app/apf.service';
import { Module } from 'src/app/model/module';

@Component({
    selector: 'app-module-details',
    templateUrl: './module-details.component.html',
    styleUrls: ['./module-details.component.scss']
})
export class ModuleDetailsComponent {

    module: Module;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private apf: ApfService
    ) {
        this.module = new Module();
        this.activatedRoute.paramMap.subscribe((params) => {
            let id = +params.get('id')!;
            for (let m of apf.project.modules) {
                if (m.id === id) {
                    this.module = m
                    break;
                }
            }
        });
    }
}
