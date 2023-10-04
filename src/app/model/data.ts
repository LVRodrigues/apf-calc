export class Data {
    id!: number;
    name: string;
    description!: string | undefined;

    constructor() {
        this.id = 0;
        this.name = 'invalid';
    }
}
