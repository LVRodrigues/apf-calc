import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Module } from 'src/app/model/module';

@Component({
    selector: 'app-module-dialog',
    templateUrl: './module-dialog.component.html',
    styleUrls: ['./module-dialog.component.scss']
})
export class NewModuleDialogComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Module) 
    {
    }
}
