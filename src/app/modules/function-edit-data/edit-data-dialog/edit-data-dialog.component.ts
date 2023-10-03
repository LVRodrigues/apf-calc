import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from 'src/app/model/data';

@Component({
    selector: 'app-edit-data-dialog',
    templateUrl: './edit-data-dialog.component.html',
    styleUrls: ['./edit-data-dialog.component.scss']
})
export class EditDataDialogComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Data) 
    {
    }
}
