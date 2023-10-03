import { Function, FunctionData } from "./function";

export class Module {
    
    id!: number;
    name!: string;
    description: string | undefined;
    functions!: Function[];

    constructor() {
        this.id = 0;
        this.functions = [];
    }

    public function(id: number): Function | undefined {
        let result = this.functions.find(value => value.id === id);
        return result;
    }
}
