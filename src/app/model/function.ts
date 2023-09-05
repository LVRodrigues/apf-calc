import { Data } from "./data";
import { FunctionType } from "./function-type";

export abstract class Function {
    id!: number;
    name!: string;
    description: string | undefined;
    protected _type: FunctionType;

    constructor() {
        this.id = 0;
        this._type = FunctionType.ALI;
    }

    public get type() {
        return this._type;
    }
};

export abstract class FunctionData extends Function {
    datas!: Data[];

    constructor() {
        super();
        this.datas = [];
    }
};

export class FunctionALI extends FunctionData {

    constructor() {
        super();
        this._type = FunctionType.ALI;
    }
}

export class FunctionAIE extends FunctionData {

    constructor() {
        super();
        this._type = FunctionType.AIE;
    }
}

export abstract class FunctionTransaction extends Function {
    datas!: FunctionData[]

    constructor() {
        super();
        this.datas = [];
    }
}

export class FunctionEE extends FunctionTransaction {

    constructor() {
        super();
        this._type = FunctionType.EE;
    }
}

export class FunctionCE extends FunctionTransaction {

    constructor() {
        super();
        this._type = FunctionType.CE;
    }
}


export class FunctionSE extends FunctionTransaction {

    constructor() {
        super();
        this._type = FunctionType.SE;
    }
}
