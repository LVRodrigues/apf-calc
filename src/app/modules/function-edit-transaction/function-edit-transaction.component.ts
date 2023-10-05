import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApfService } from 'src/app/apf.service';
import { Data } from 'src/app/model/data';
import { Function, FunctionCE, FunctionData, FunctionEE, FunctionSE, FunctionTransaction } from 'src/app/model/function';
import { FunctionType } from 'src/app/model/function-type';
import { Module } from 'src/app/model/module';
import { EditDataDialogComponent } from '../edit-data-dialog/edit-data-dialog.component';

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
    columns: string[] = ['name', 'description', 'actions'];

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
                this.data.alrs        = this.original.alrs;
                this.data.ders        = this.original.ders;
            }
        });
    }    

    addDER(): void {
        if (!this.opened) {
            this.opened = true;
            let data = {
                title: 'DER (Dado Elementar Relacionado)',
                value: new Data()
            };
            const dialogRef = this.dialog.open(EditDataDialogComponent, {
                data: data,
                maxHeight: '100%',
                width: '540px',
                maxWidth: '100%',
                disableClose: false,
                hasBackdrop: true
            });
            dialogRef.afterClosed().subscribe((data: Data) => {
                if (data) {
                    let last: number = -1;
                    this.data.ders.forEach(item => {
                        if (item.id > last) {
                            last = item.id;
                        }
                    });
                    data.id = ++last;
                    this.data.ders = [data, ...this.data.ders];
                }
                this.opened = false;
            });
        }
    }
    
    removeDER(item: Data): void {
        this.data.ders = this.data.ders.filter(v => v.id != item.id);
    }
        
    editDER(item: Data): void {
        if (!this.opened) {
            this.opened = true;
            let data = {
                title: 'DER (Dado Elementar Relacionado)',
                value: {...item}
            };
            const dialogRef = this.dialog.open(EditDataDialogComponent, {
                data: data,
                maxHeight: '100%',
                width: '540px',
                maxWidth: '100%',
                disableClose: false,
                hasBackdrop: true
            });
            dialogRef.afterClosed().subscribe((data: Data) => {
                if (data) {
                    item.name = data.name;
                    item.description = data.description;
                }
                this.opened = false;
            });
        }
    }        

    canConfirm(): boolean {
        let result = this.data.name.length > 0 && this.data.ders.length > 0;
        if (this.data.type === this.Functiontype.CE) {
            result = result && this.data.alrs.length > 0;
        }
        return result;
    }

    confirm(): void {
        this.original.name          = this.data.name;
        this.original.description   = this.data.description;
        this.original.alrs          = this.data.alrs;
        this.original.ders          = this.data.ders;
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
