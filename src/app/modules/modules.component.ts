import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApfService } from '../apf.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Module } from '../model/module';
import { ModuleDialogComponent } from './module-dialog/module-dialog.component';

@Component({
    selector: 'app-modules',
    templateUrl: './modules.component.html',
    styleUrls: ['./modules.component.scss']
})
export class ModulesComponent {

    private opened: boolean;

    constructor(
        public apf: ApfService,
        public dialog: MatDialog) 
    {
        this.opened = false;
    }

    edit(module: Module): void {
        if (!this.opened) {
            this.opened = true;
            let data = new Module();
            data.name = module.name;
            data.description = module.description;
            const dialogRef = this.dialog.open(ModuleDialogComponent, {
                data: data,
                maxHeight: '100%',
                width: '540px',
                maxWidth: '100%',
                disableClose: false,
                hasBackdrop: true
            });
            dialogRef.afterClosed().subscribe((data: Module) => {
                if (data) {
                    module.name = data.name;
                    module.description = data.description;
                }
                this.opened = false;
            });
        }
    }

    delete(module: Module): void {
        if (!this.opened) {
            this.opened = true;
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: {
                    title: 'Excluir Módulo',
                    question: 'Todas as informações analisadas no módulo "' + module.name + '" serão excluidas. Deseja realmente continuar?',
                },
                maxHeight: '100%',
                width: '440px',
                maxWidth: '100%',
                disableClose: false,
                hasBackdrop: true
            });
            dialogRef.afterClosed().subscribe((result: boolean) => {
                if (result) {
                    this.apf.project.modules = this.apf.project.modules.filter(item => item.id != module.id);
                }
                this.opened = false;
            });
        }
    }
}
