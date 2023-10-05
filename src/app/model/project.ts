import { Module } from "./module";

export class Project {
    name!: string ;
    description: string | undefined;
    responsible: string | undefined;
    date!: Date;
    version!: number;
    modules!: Module[];

    constructor() {
        this.date = new Date();
        this.modules = [];
        this.version = 1;
    }

    public module(id: number): Module | undefined {
        let result = this.modules.find(value => value.id === id);
        return result;
    }

    public get score(): number {
        let result = 0;
        this.modules.forEach(item => result += item.value);
        return result;
    }
}
