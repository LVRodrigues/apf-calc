import { Module } from "./module";

export class Project {
    name!: string;
    description: string | undefined;
    date!: Date;
    responsible: string | undefined;
    modules!: Module[];
    score!: number;

    constructor() {
        this.name = "Indefinido";
        // this.description = "Aguardando descrição."
        this.date = new Date();
        this.modules = [];
        this.score = 0;
    }
}
