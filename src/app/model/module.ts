export class Module {
    id!: number;
    name!: string;
    description: string | undefined;
    functions!: Function[];

    constructor() {
        this.id = 0;
        this.functions = [];
    }
}
