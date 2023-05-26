import { Injectable } from '@angular/core';
import { Project } from './model/project';
import { Module } from './model/module';

@Injectable({
    providedIn: 'root'
})
export class ApfService {

    project!: Project;

    constructor() {
        this.project = new Project();
    }
}
