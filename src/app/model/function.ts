import { ComplexType } from "./complex-type";
import { Data } from "./data";
import { FunctionType } from "./function-type";

export abstract class Function {
    id: number;
    name: string;
    description: string | undefined;

    constructor() {
        this.id = 0;
        this.name = "indefinido";
    }

    public abstract get type(): FunctionType;

    public abstract get complex(): ComplexType;
};

export abstract class FunctionData extends Function {
    ders: Data[];
    rlrs: Data[];

    constructor() {
        super();
        this.ders = [];
        this.rlrs = [];
    }

    public override get complex(): ComplexType {
        return ComplexType.LOW;
    }    
};

export class FunctionALI extends FunctionData {

    constructor() {
        super();
    }

    public override get type() {
        return FunctionType.ALI;
    }
}

export class FunctionAIE extends FunctionData {

    constructor() {
        super();
    }

    public override get type() {
        return FunctionType.AIE;
    }    
}

export abstract class FunctionTransaction extends Function {
    datas: FunctionData[]

    constructor() {
        super();
        this.datas = [];
    }

    public override get complex(): ComplexType {
        return ComplexType.LOW;
    }    
}

export class FunctionEE extends FunctionTransaction {

    constructor() {
        super();
    }

    public override get type() {
        return FunctionType.EE;
    }    
}

export class FunctionCE extends FunctionTransaction {

    constructor() {
        super();
    }

    public override get type() {
        return FunctionType.CE;
    }    
}


export class FunctionSE extends FunctionTransaction {

    constructor() {
        super();
    }

    public override get type() {
        return FunctionType.SE;
    }
}
