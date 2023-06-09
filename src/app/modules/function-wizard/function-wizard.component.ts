import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FunctionType } from 'src/app/model/function-type';
import { Function } from 'src/app/model/function';


enum PageType {
    SELECT_TYPE,
    DATA_TYPE,
    TRANSACTION_TYPE,
    RESULT,
}

export interface DialogData {
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

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.page = PageType.SELECT_TYPE;
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
}
