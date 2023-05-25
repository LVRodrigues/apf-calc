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
        // Adicionar módulos
        for (let i = 0; i < 3; i++) {
            let module: Module = new Module();
            module.id = i;
            module.name = 'Módulo ' + i;
            this.project.modules[i] = module;
        }
        this.project.name = 'Desenv'
        this.project.score = 120;
        this.project.description = 'Projeto de Exemplo';
        this.project.responsible = 'Luciano Vieira Rodrigues';
    }
}
