import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FunctionType } from 'src/app/model/function-type';
import { Function } from 'src/app/model/function';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';


enum PageType {
    SELECT_TYPE,
    DATA_TYPE,
    DATA_TYPE_EXTRA,
    TRANSACTION_TYPE,
    RESULT,
}

export interface DialogData {
}

export interface DER {
    name: string;
}

@Component({
    selector: 'app-function-wizard',
    templateUrl: './function-wizard.component.html',
    styleUrls: ['./function-wizard.component.scss']
})
export class FunctionWizardComponent {

    page: PageType;
    PageType = PageType;
    FunctionType = FunctionType;

    name: string | undefined;
    description: string | undefined;
    functionType: FunctionType | undefined;

    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    dataDERs: DER[];

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.page = PageType.SELECT_TYPE;
        this.dataDERs = [];
    }

    isNextVisible(): boolean {
        return this.page != PageType.RESULT;
    }

    canNext(): boolean {
        let result: boolean = false;
        switch (this.page) {
            case PageType.SELECT_TYPE:
                result = this.canNextSelectType();
                break;
            case PageType.DATA_TYPE:
                result = this.canNextDataType();
                break;
            case PageType.TRANSACTION_TYPE:
                break;

        }
        return result;
    }

    canNextSelectType(): boolean {
        return ((this.name != undefined) && (this.name.trim().length > 0) &&
            (this.functionType != undefined));
    }

    canNextDataType(): boolean {
        return this.dataDERs.length > 0;
    }

    doNext() {
        switch (this.page) {
            case PageType.SELECT_TYPE:
                if (this.functionType === FunctionType.ALI || this.functionType === FunctionType.AIE) {
                    this.page = PageType.DATA_TYPE;
                } else {
                    this.page = PageType.TRANSACTION_TYPE;
                }
                break;
            case PageType.DATA_TYPE:
                this.page = PageType.DATA_TYPE_EXTRA;
                break;
            case PageType.DATA_TYPE_EXTRA:
                break;
            case PageType.TRANSACTION_TYPE:
                break;
        }
    }

    isPreviousVisible(): boolean {
        return this.page != PageType.SELECT_TYPE;
    }

    canPrevious(): boolean {
        return true;
    }

    doPrevious() {
        this.page--;
    }

    isConfirmVisible(): boolean {
        return this.page == PageType.RESULT;
    }

    canConfirm(): boolean {
        return false;
    }

    /**
     * ALI e AIE (Data Page)
     */
    dataDERAdd(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            this.dataDERs.push({ name: value });
        }
        event.chipInput!.clear();
    }

    dataDERRemove(der: DER): void {
        const index = this.dataDERs.indexOf(der);
        if (index >= 0) {
            this.dataDERs.splice(index, 1);
        }
    }

    dataDEREdit(der: DER, event: MatChipEditedEvent) {
        const value = event.value.trim();
        if (!value) {
            this.dataDERRemove(der);
            return;
        }
        const index = this.dataDERs.indexOf(der);
        if (index >= 0) {
            this.dataDERs[index].name = value;
        }
    }
}
