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
    ders: Data[];
    rlrs: Data[];

    constructor() {
        super();
        this.ders = [];
        this.rlrs = [];
    }

    public override get complex(): ComplexType {
        let result = ComplexType.LOW;
        switch (true) {
            case (this.rlrs.length === 1):
                if (this.ders.length > 50) {
                    result = ComplexType.MEDIUM;
                }
                break;
            case (this.rlrs.length <= 5):
                switch (true) {
                    case (this.ders.length <= 19):
                        break;
                    case (this.ders.length <= 50):
                        result = ComplexType.MEDIUM;
                        break;
                    default:
                        result = ComplexType.HIGH;
                }
                break;
            default:
                if (this.ders.length <= 19) {
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
    alrs: FunctionData[];
    ders: Data[];

    constructor() {
        super();
        this.alrs = [];
        this.ders = [];
    }

    public override get complex(): ComplexType {
        let result = ComplexType.LOW;
        switch (true) {
            case (this.alrs.length <= 1):
                if (this.ders.length > 19) {
                    result = ComplexType.MEDIUM;
                }
                break;
            case (this.alrs.length <= 3):
                switch (true) {
                    case (this.ders.length <= 5):
                        break;
                    case (this.ders.length <= 19):
                        result = ComplexType.MEDIUM;
                        break;
                    default:
                        result = ComplexType.HIGH;
                }
                break;
            default:
                switch (true) {
                    case (this.ders.length <= 5):
                        result = ComplexType.MEDIUM;
                        break;
                    default:
                        result = ComplexType.HIGH;
                }
        }
        return result;    
    }

    public override get value(): number {
        let result = 0;
        switch (this.complex) {
            case ComplexType.LOW:
                result = 3;
                break;
            case ComplexType.MEDIUM:
                result = 4;
                break;
            case ComplexType.HIGH:
                result = 6;
                break;
        }
        return result;
    }    
}

export class FunctionEE extends FunctionTransaction {

    constructor() {
        super();
    }

    public override get type() {
        return FunctionType.EE;
    }    

    public override get complex(): ComplexType {
        let result = ComplexType.LOW;
        switch (true) {
            case (this.alrs.length <= 1):
                if (this.ders.length > 15) {
                    result = ComplexType.MEDIUM;
                }
                break;
            case (this.alrs.length === 2):
                switch (true) {
                    case (this.ders.length <= 4):
                        break;
                    case (this.ders.length <= 15):
                        result = ComplexType.MEDIUM;
                        break;
                    default:
                        result = ComplexType.HIGH;
                }
                break;
            default:
                switch (true) {
                    case (this.ders.length <= 4):
                        result = ComplexType.MEDIUM;
                        break;
                    default:
                        result = ComplexType.HIGH;
                }
        }
        return result;
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

    public override get value(): number {
        let result = 0;
        switch (this.complex) {
            case ComplexType.LOW:
                result = 4;
                break;
            case ComplexType.MEDIUM:
                result = 5;
                break;
            case ComplexType.HIGH:
                result = 7;
                break;
        }
        return result;
    }       
}
