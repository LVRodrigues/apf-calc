import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ApfService } from 'src/app/apf.service';
import { Data } from 'src/app/model/data';
import { FunctionAIE, FunctionALI, FunctionData } from 'src/app/model/function';
import { FunctionType } from 'src/app/model/function-type';
import { Module } from 'src/app/model/module';
import { EditDataDialogComponent } from './edit-data-dialog/edit-data-dialog.component';

@Component({
    selector: 'app-function-edit-data',
    templateUrl: './function-edit-data.component.html',
    styleUrls: ['./function-edit-data.component.scss']
})
export class FunctionEditDataComponent {
    
    module!: Module;
    data!: FunctionData;

    private original!: FunctionData;
    Functiontype = FunctionType;

    columns: string[] = ['name', 'description', 'actions'];

    private opened: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private apf: ApfService,
        private dialog: MatDialog,
        private router: Router
    ) {
        this.opened = false;
        this.activatedRoute.queryParamMap.subscribe((params) => {
            let moduleID    = +params.get('module')!;
            this.module      = this.apf.project.module(moduleID)!;
            let functionID  = +params.get('function')!;
            let fun         = this.module.function(functionID)!;
            if (fun instanceof FunctionData) {
                this.original = fun;
                if (this.original.type === FunctionType.ALI) {
                    this.data = new FunctionALI();
                } else {
                    this.data = new FunctionAIE();
                }
                this.data.id          = this.original.id;
                this.data.name        = this.original.name;
                this.data.description = this.original.description;
                this.data.ders         = this.original.ders;
                this.data.rlrs         = this.original.rlrs;
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

    addRLR(): void {
        if (!this.opened) {
            this.opened = true;
            let data = {
                title: 'RLR (Registro Elementar Relacionado)',
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
                    this.data.rlrs.forEach(item => {
                        if (item.id > last) {
                            last = item.id;
                        }
                    });
                    data.id = ++last;
                    this.data.rlrs = [data, ...this.data.rlrs];
                }
                this.opened = false;
            });
        }
    }
    
    removeRLR(item: Data): void {
        this.data.rlrs = this.data.rlrs.filter(v => v.id != item.id);
    }
        
    editRLR(item: Data): void {
        if (!this.opened) {
            this.opened = true;
            let data = {
                title: 'RLR (Registro Elementar Relacionado)',
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
        return this.data.name.length > 0 
            && this.data.ders.length > 0 
            && this.data.rlrs.length > 0;
    }

    confirm(): void {
        this.original.name          = this.data.name;
        this.original.description   = this.data.description;
        this.original.ders           = this.data.ders;
        this.original.rlrs           = this.data.rlrs;
        this.naviageBack();
    }

    cancel(): void {
        this.naviageBack();
    }

    private naviageBack() {
        this.router.navigate(['functions-list', this.module]);
    }
}
