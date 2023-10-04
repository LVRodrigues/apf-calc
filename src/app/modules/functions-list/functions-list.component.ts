import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApfService } from 'src/app/apf.service';
import { ComplexType } from 'src/app/model/complex-type';
import { Function, FunctionData, FunctionTransaction } from 'src/app/model/function';
import { FunctionType } from 'src/app/model/function-type';
import { Module } from 'src/app/model/module';

@Component({
    selector: 'app-functions-list',
    templateUrl: './functions-list.component.html',
    styleUrls: ['./functions-list.component.scss']
})
export class FunctionsListComponent {

    columns: string[] = ['name', 'type', 'complex', 'value', 'actions'];
    module: Module;

    FunctionType = FunctionType;
    ComplexType = ComplexType;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private apf: ApfService
    ) {
        this.module = new Module();
        this.activatedRoute.paramMap.subscribe((params) => {
            let id      = +params.get('id')!;
            this.module = this.apf.project.module(id)!;
        });
    }

    edit(item: Function): void {
        if (item instanceof FunctionData) {
            this.router.navigate(['function-edit-data'], {queryParams: { module: this.module.id, function: item.id}});
        } else {
            this.router.navigate(['function-edit-transaction'], {queryParams: { module: this.module.id, function: item.id}});
        }
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
