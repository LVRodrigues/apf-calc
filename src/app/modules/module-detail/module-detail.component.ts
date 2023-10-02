import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FunctionType } from 'src/app/model/function-type';
import { Module } from 'src/app/model/module';
import { Function, FunctionData, FunctionTransaction } from 'src/app/model/function';

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

	columns: string[] = ['name', 'actions'];
	selecteds: Function[];
	FunctionType = FunctionType;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Data) {
		this.selecteds = this.selectedFunctions();
    }

	private selectedFunctions(): Function[] {
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
		this.selecteds = this.selecteds.filter(item => item.id != fun.id);
	}

	canDelete(fun: Function): boolean {
		let result = true;
		if (fun instanceof FunctionData) {
			for (let other of this.data.module.functions) {
				if (other instanceof FunctionTransaction) {
					for (let check of other.datas) {
						if (check.id === fun.id) {
							result = false;
							break;
						}
					}
				}
				if (!result) {
					break;
				}
			}
		}
		return result;
	}

	doConfirm(): void {
		let originals = this.selectedFunctions();
		let excludeds = originals.filter(item => !this.selecteds.includes(item));
		this.data.module.functions = this.data.module.functions.filter(item => !excludeds.includes(item));
		this.selecteds.forEach(selected => {
			let index = this.data.module.functions.indexOf(selected);
			this.data.module.functions[index] = selected;
		});
	}
}
