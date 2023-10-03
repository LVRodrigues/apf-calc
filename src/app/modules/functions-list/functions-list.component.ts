import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApfService } from 'src/app/apf.service';
import { Function, FunctionData, FunctionTransaction } from 'src/app/model/function';
import { Module } from 'src/app/model/module';

@Component({
    selector: 'app-functions-list',
    templateUrl: './functions-list.component.html',
    styleUrls: ['./functions-list.component.scss']
})
export class FunctionsListComponent {

    columns: string[] = ['name', 'type', 'complex', 'value', 'actions'];
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

    edit(item: Function): void {
        throw Error("Não implementado");
    }

    remove(item: Function): void {
        this.module.functions = this.module.functions.filter(fun => fun.id != item.id);
    }

    canRemove(item: Function): boolean {
        let result = true;
        if (item instanceof FunctionData) {
            try {
                this.module.functions.forEach(fun => {
                    if (fun instanceof FunctionTransaction) {
                        fun.datas.forEach(data => {
                            if (data.id === item.id) {
                                throw Error("Função de data em uso");
                            }
                        })
                    }
                })
            } catch (error) {
                result = false;
            }         
        }
        return result;
    }
}
