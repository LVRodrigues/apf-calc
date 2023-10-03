import { Module } from "./module";

export class Project {
    name!: string ;
    description: string | undefined;
    responsible: string | undefined;
    date!: Date;
    score!: number;
    version!: number;
    modules!: Module[];

    constructor() {
        this.date = new Date();
        this.modules = [];
        this.version = 1;
        this.score = 0;
    }

    public module(id: number): Module | undefined {
        let result = this.modules.find(value => value.id === id);
        return result;
    }
}
