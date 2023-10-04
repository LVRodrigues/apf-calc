import { ComplexType } from "./complex-type";
import { Data } from "./data";
import { FunctionType } from "./function-type";

export abstract class Function {
    id!: number;
    name!: string;
    description: string | undefined;

    constructor() {
    }

    public abstract get type(): FunctionType;

    public abstract get complex(): ComplexType;

    public abstract get value(): number;
};

export abstract class FunctionData extends Function {
    der: Data[];
    rlr: Data[];

    constructor() {
        super();
        this.der = [];
        this.rlr = [];
    }

    public override get complex(): ComplexType {
        let result = ComplexType.LOW;
        switch (true) {
            case (this.rlr.length === 1):
                if (this.der.length > 50) {
                    result = ComplexType.MEDIUM;
                }
                break;
            case (this.rlr.length <= 5):
                switch (true) {
                    case (this.der.length <= 19):
                        break;
                    case (this.der.length <= 50):
                        result = ComplexType.MEDIUM;
                        break;
                    default:
                        result = ComplexType.HIGH;
                }
                break;
            default:
                if (this.der.length <= 19) {
                    result = ComplexType.MEDIUM;
                } else {
                    result = ComplexType.HIGH;
                }
        }
        return result;
    }

    public override get value(): number {
        let result = 0;
        switch (this.complex) {
            case ComplexType.LOW:
                result = 7;
                break;
            case ComplexType.MEDIUM:
                result = 10;
                break;
            case ComplexType.HIGH:
                result = 15;
                break;
        }
        return result;
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
        let result = ComplexType.LOW;

        return result;
    }    

    public override get value(): number {
        return 0;
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
