import { Data } from "./data";
import { FunctionType } from "./function-type";

export class Function {
    id!: number;
    name!: string;
    description: string | undefined;
    type!: FunctionType;
    datas!: Data[];

    constructor() {
        this.id = 0;
        this.type = FunctionType.ALI;
        this.datas = [];
    }
}
