import { Module } from "./module";

export class Project {
    name!: string;
    description!: string;
    date!: Date;
    modules!: Module[];

    constructor() {
        this.name = "Indefinido";
        this.description = "Aguardando descrição."
        this.date = new Date();
        this.modules = [];
    }
}
