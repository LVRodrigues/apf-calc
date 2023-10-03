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
    DATA_TYPE,
    DATA_TYPE_EXTRA,
    TRANSACTION_TYPE,
    RESULT,
}

export interface DialogData {
    module: Module;
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
    current: Module;

    name!: string;
    description!: string;
    functionType!: FunctionType;

    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    dataDERs: DER[];

    checkCreate: boolean;
    checkRead: boolean;
    checkUpdate: boolean;
    checkDelete: boolean;

    selectedsDataFunctions: FunctionData[];
    compareFunctions = (o1: Function, o2: Function) => o1.id===o2.id;

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.current = data.module;
        this.page = PageType.SELECT_TYPE;
        this.dataDERs = [];
        this.checkCreate = false;
        this.checkRead = false;
        this.checkUpdate = false;
        this.checkDelete = false;
        this.selectedsDataFunctions = [];
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
            case PageType.DATA_TYPE_EXTRA:
                result = true;
                break;
            case PageType.TRANSACTION_TYPE:
                result = this.canNextTransactionType();
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

    canNextTransactionType(): boolean {
        return this.selectedsDataFunctions.length > 0;
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
                this.checkRead = true;
                break;
            case PageType.DATA_TYPE_EXTRA:
                this.page = PageType.RESULT;
                break;
            case PageType.TRANSACTION_TYPE:
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
            case PageType.DATA_TYPE:
                this.page = PageType.SELECT_TYPE;
                break;
            case PageType.DATA_TYPE_EXTRA:
                this.page = PageType.DATA_TYPE;
                break;
            case PageType.TRANSACTION_TYPE:
                this.page = PageType.SELECT_TYPE;
                break;
            case PageType.RESULT:
                if (this.functionType === FunctionType.ALI || this.functionType === FunctionType.AIE) {
                    this.page = PageType.DATA_TYPE_EXTRA;
                } else {
                    this.page = PageType.TRANSACTION_TYPE;
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
        this.dataDERs.forEach(der => {
            let data = new Data();
            data.id = ++i;
            data.name = der.name;
            fun.datas.push(data);
        });

        if (this.checkRead) {
            let ce = new FunctionCE();
            ce.id = ++last;
            ce.name = 'Consultar ' + fun.name;
            ce.datas.push(fun);
            this.current.functions.push(ce);
        }

        if (this.checkCreate) {
            let ee = new FunctionEE();
            ee.id = ++last;
            ee.name = 'Inserir ' + fun.name;
            ee.datas.push(fun);
            this.current.functions.push(ee);
        }

        if (this.checkUpdate) {
            let ee = new FunctionEE();
            ee.id = ++last;
            ee.name = 'Alterar ' + fun.name;
            ee.datas.push(fun);
            this.current.functions.push(ee);
        }

        if (this.checkDelete) {
            let ee = new FunctionEE();
            ee.id = ++last;
            ee.name = 'Excluir ' + fun.name;
            ee.datas.push(fun);
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
                // FIXME Notificar falha.
                return;
        }
        fun.id = ++last;
        fun.name = this.name;
        fun.description = this.description;
        for (let data of this.selectedsDataFunctions) {
            fun.datas.push(data);
        }
        this.current.functions.push(fun);
    }
}