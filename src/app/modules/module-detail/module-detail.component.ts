import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FunctionType } from 'src/app/model/function-type';
import { Module } from 'src/app/model/module';
import { Function } from 'src/app/model/function';

export interface Data {
	module: Module,
	functionType: FunctionType
}

@Component({
	selector: 'app-module-detail',
	templateUrl: './module-detail.component.html',
	styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent {

	columns: string[] = ['Nome', 'Editar', 'Excluir'];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Data) 
    {
    }

	selectedFunctions(): Function[] {
		let result: Function[] = [];
		this.data.module.functions.forEach(fun => {
            if (fun.type === this.data.functionType) {
                result.push(fun);
            }
        })
		return result;
	}

	edit(fun: Function): void {
		console.log("Editar: " + fun.name);
	}

	delete(fun: Function): void {
		console.log("Excluir: " + fun.name);
	}
}
