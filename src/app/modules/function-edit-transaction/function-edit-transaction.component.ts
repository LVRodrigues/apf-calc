import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApfService } from 'src/app/apf.service';
import { Function, FunctionCE, FunctionData, FunctionEE, FunctionSE, FunctionTransaction } from 'src/app/model/function';
import { FunctionType } from 'src/app/model/function-type';
import { Module } from 'src/app/model/module';

@Component({
    selector: 'app-function-edit-transaction',
    templateUrl: './function-edit-transaction.component.html',
    styleUrls: ['./function-edit-transaction.component.scss']
})
export class FunctionEditTransactionComponent {

    module!: Module;
    data!: FunctionTransaction;

    private original!: FunctionTransaction;
    Functiontype = FunctionType;

    private opened: boolean;

    compareFunctions = (o1: Function, o2: Function) => o1.id===o2.id;

    constructor(
        private activatedRoute: ActivatedRoute,
        private apf: ApfService,
        private dialog: MatDialog,
        private router: Router
    ) {
        this.opened = false;
        this.activatedRoute.queryParamMap.subscribe((params) => {
            let moduleID    = +params.get('module')!;
            this.module     = this.apf.project.module(moduleID)!;
            let functionID  = +params.get('function')!;
            let fun         = this.module.function(functionID)!;
            if (fun instanceof FunctionTransaction) {
                this.original   = fun;
                switch (this.original.type) {
                    case FunctionType.CE:
                        this.data = new FunctionCE();
                        break;
                    case FunctionType.EE:
                        this.data = new FunctionEE();
                        break;
                    case FunctionType.SE:
                        this.data = new FunctionSE();
                        break;
                    default:
                        throw Error("Tipo incompatível");
                }
                this.data.id          = this.original.id;
                this.data.name        = this.original.name;
                this.data.description = this.original.description;
                this.data.datas       = this.original.datas;
            }
        });
    }    

    confirm(): void {
        this.original.name          = this.data.name;
        this.original.description   = this.data.description;
        this.original.datas         = this.data.datas;
        this.naviageBack();
    }

    cancel(): void {
        this.naviageBack();
    }

    private naviageBack() {
        this.router.navigate(['functions-list', this.module]);
    }

    listFunctionData(): FunctionData[] {
        let result: FunctionData[] = [];
        this.module.functions.forEach(item => {
            if (item instanceof FunctionData) {
                result.push(item);
            }
        })
        return result;
    }
}
