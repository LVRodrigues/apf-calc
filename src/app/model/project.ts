export class Project {
    name!: string;
    description!: string;
    date!: Date;

    constructor() {
        this.name = "Indefinido";
        this.description = "Aguardando descrição."
        this.date = new Date();
    }
}
