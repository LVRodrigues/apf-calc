import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FunctionType } from 'src/app/model/function-type';
import { Function, FunctionAIE, FunctionALI, FunctionEE, FunctionCE, FunctionData, FunctionTransaction, FunctionSE } from 'src/app/model/function';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Data } from 'src/app/model/data';
import { Module } from 'src/app/model/module';


enum PageType {
    SELECT_TYPE,
    DATA_TYPE_DER,
    DATA_TYPE_RLR,
    DATA_TYPE_EXTRA,
    TRANSACTION_TYPE_ALR,
    TRANSACTION_TYPE_DER,
    RESULT,
}

export interface DialogData {
    module: Module;
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
    current: Module;

    name!: string;
    description!: string;
    functionType!: FunctionType;

    compareFunctions = (o1: Function, o2: Function) => o1.id===o2.id;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    dataDER: Data[];
    dataRLR: Data[];

    checkCreate: boolean;
    checkRead: boolean;
    checkUpdate: boolean;
    checkDelete: boolean;

    selectedALR: FunctionData[];
    

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.current     = data.module;
        this.page        = PageType.SELECT_TYPE;
        this.dataDER     = [];
        this.dataRLR     = [];
        this.checkCreate = false;
        this.checkRead   = false;
        this.checkUpdate = false;
        this.checkDelete = false;
        this.selectedALR = [];
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
            case PageType.DATA_TYPE_DER:
                result = this.canNextDataTypeDER();
                break;
            case PageType.DATA_TYPE_RLR:
                result = this.canNextDataTypeRLR();
                break;
            case PageType.DATA_TYPE_EXTRA:
                result = true;
                break;
            case PageType.TRANSACTION_TYPE_ALR:
                result = this.canNextTransactionTypeARL();
                break;
            case PageType.TRANSACTION_TYPE_DER:
                result = this.canNextTransactionTypeDER();
                break;
        }
        return result;
    }

    canNextSelectType(): boolean {
        return ((this.name != undefined) && (this.name.trim().length > 0) &&
            (this.functionType != undefined));
    }

    canNextDataTypeDER(): boolean {
        return this.dataDER.length > 0;
    }

    canNextDataTypeRLR(): boolean {
        return this.dataRLR.length > 0;
    }    

    canNextTransactionTypeARL(): boolean {
        let result = true;
        if (this.functionType == FunctionType.CE) {
            result = this.selectedALR.length > 0;
        }
        return result;
    }

    canNextTransactionTypeDER(): boolean {
        return this.dataDER.length > 0;
    }

    doNext() {
        switch (this.page) {
            case PageType.SELECT_TYPE:
                if (this.functionType === FunctionType.ALI || this.functionType === FunctionType.AIE) {
                    this.page = PageType.DATA_TYPE_DER;
                } else {
                    this.page = PageType.TRANSACTION_TYPE_ALR;
                }
                break;
            case PageType.DATA_TYPE_DER:
                this.page = PageType.DATA_TYPE_RLR;
                break;
            case PageType.DATA_TYPE_RLR:
                this.page = PageType.DATA_TYPE_EXTRA;
                this.checkRead = true;
                break;
            case PageType.DATA_TYPE_EXTRA:
                this.page = PageType.RESULT;
                break;
            case PageType.TRANSACTION_TYPE_ALR:
                this.page = PageType.TRANSACTION_TYPE_DER;
                break;
            case PageType.TRANSACTION_TYPE_DER:
                this.page = PageType.RESULT;
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
        switch (this.page) {
            case PageType.SELECT_TYPE:
                break;
            case PageType.DATA_TYPE_DER:
                this.page = PageType.SELECT_TYPE;
                break;
            case PageType.DATA_TYPE_RLR:
                this.page = PageType.DATA_TYPE_DER;
                break;
            case PageType.DATA_TYPE_EXTRA:
                this.page = PageType.DATA_TYPE_RLR;
                break;
            case PageType.TRANSACTION_TYPE_ALR:
                this.page = PageType.SELECT_TYPE;
                break;
            case PageType.TRANSACTION_TYPE_DER:
                this.page = PageType.TRANSACTION_TYPE_ALR;
                break;
            case PageType.RESULT:
                if (this.functionType === FunctionType.ALI || this.functionType === FunctionType.AIE) {
                    this.page = PageType.DATA_TYPE_EXTRA;
                } else {
                    this.page = PageType.TRANSACTION_TYPE_DER;
                }
        }
    }

    isConfirmVisible(): boolean {
        return this.page == PageType.RESULT;
    }

    canConfirm(): boolean {
        return this.page == PageType.RESULT;
    }

    /**
     * ALI e AIE (Data Page)
     */
    dataDERAdd(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            let data: Data = {
                id: 1,
                name: value,
                description: undefined
            };
            this.dataDER.push(data);
        }
        event.chipInput!.clear();
    }

    dataDERRemove(data: Data): void {
        const index = this.dataDER.indexOf(data);
        if (index >= 0) {
            this.dataDER.splice(index, 1);
        }
    }

    dataDEREdit(data: Data, event: MatChipEditedEvent) {
        const value = event.value.trim();
        if (!value) {
            this.dataDERRemove(data);
            return;
        }
        const index = this.dataDER.indexOf(data);
        if (index >= 0) {
            this.dataDER[index].name = value;
        }
    }

    dataRLRAdd(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            let data: Data = {
                id: 1,
                name: value,
                description: undefined
            };
            this.dataRLR.push(data);
        }
        event.chipInput!.clear();
    }

    dataRLRRemove(data: Data): void {
        const index = this.dataRLR.indexOf(data);
        if (index >= 0) {
            this.dataRLR.splice(index, 1);
        }
    }

    dataRLREdit(data: Data, event: MatChipEditedEvent) {
        const value = event.value.trim();
        if (!value) {
            this.dataRLRRemove(data);
            return;
        }
        const index = this.dataRLR.indexOf(data);
        if (index >= 0) {
            this.dataRLR[index].name = value;
        }
    }    

    /*
     * CE, EE e SE Page
     */

    hasFunctionData(): boolean {
        let result = false;
        for (let fun of this.current.functions) {
            if (fun instanceof FunctionData) {
                result = true;
                break;
            }
        }
        return result;
    }

    listFunctionData(): FunctionData[] {
        let result: FunctionData[] = [];
        for (let fun of this.current.functions) {
            if (fun instanceof FunctionData) {
                result.push(fun as FunctionData);
            }
        }
        return result;
    }

    doConfirm(): void {
        let last = 0;
        this.current.functions.forEach(fun => {
            if (fun.id > last) {
                last = fun.id;
            }
        });
        if (this.functionType === FunctionType.ALI || this.functionType === FunctionType.AIE) {
            this.doConfirmFunctionData(last);
        } else {
            this.doConfirmFunctionTransaction(last);
        }

    }

    private doConfirmFunctionData(last: number): void {
        let fun: FunctionData;
        if (this.functionType == FunctionType.ALI) {
            fun = new FunctionALI();
        } else {
            fun = new FunctionAIE();
        }
        fun.id = ++last;
        fun.name = this.name;
        fun.description = this.description;
        this.current.functions.push(fun);

        let i = 0;
        this.dataDER.forEach(der => {
            der.id = ++i;
            fun.ders.push(der);
        });

        i = 0;
        this.dataRLR.forEach(rlr => {
            rlr.id = ++i;
            fun.rlrs.push(rlr);
        });

        if (this.checkRead) {
            let ce = new FunctionCE();
            ce.id = ++last;
            ce.name = 'Consultar ' + fun.name;
            ce.alrs.push(fun);
            this.current.functions.push(ce);
        }

        if (this.checkCreate) {
            let ee = new FunctionEE();
            ee.id = ++last;
            ee.name = 'Inserir ' + fun.name;
            ee.alrs.push(fun);
            this.current.functions.push(ee);
        }

        if (this.checkUpdate) {
            let ee = new FunctionEE();
            ee.id = ++last;
            ee.name = 'Alterar ' + fun.name;
            ee.alrs.push(fun);
            this.current.functions.push(ee);
        }

        if (this.checkDelete) {
            let ee = new FunctionEE();
            ee.id = ++last;
            ee.name = 'Excluir ' + fun.name;
            ee.alrs.push(fun);
            this.current.functions.push(ee);
        }
    }

    private doConfirmFunctionTransaction(last: number): void {
        let fun: FunctionTransaction;
        switch (this.functionType) {
            case FunctionType.CE:
                fun = new FunctionCE();
                break;
            case FunctionType.EE:
                fun = new FunctionEE();
                break;
            case FunctionType.SE:
                fun = new FunctionSE();
                break;
            default:
                throw Error("Tipo inválido...");
        }
        fun.id = ++last;
        fun.name = this.name;
        fun.description = this.description;
        for (let data of this.selectedALR) {
            fun.alrs.push(data);
        }
        let i = 0;
        this.dataDER.forEach(der => {
            der.id = ++i;
            fun.ders.push(der);
        });
        this.current.functions.push(fun);
    }
}