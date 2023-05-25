import { Module } from "./module";

export class Project {
    name!: string;
    description: string | undefined;
    responsible: string | undefined;
    date!: Date;
    score!: number;
    version!: number;
    modules!: Module[];

    constructor() {
        this.name = "Indefinido";
        // this.description = "Aguardando descrição."
        this.date = new Date();
        this.modules = [];
        this.version = 1;
        this.score = 0;
    }
}
