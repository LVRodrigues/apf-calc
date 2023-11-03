import { EmpiricalType } from "./empirical-type";

export class Empirical {
    id!: EmpiricalType;
    value!: number;

    constructor() {
    }

    public get description(): string {
        let result = 'indefinido';
        switch (this.id) {
            case EmpiricalType.PLANNING:
                result = 'Planejamento';
                break;
            case EmpiricalType.COORDINATION:
                result = 'Coordenação';
                break;
            case EmpiricalType.TESTS:
                result = 'Testes';
                break;
            case EmpiricalType.IMPLANTATION:
                result = 'Implantação';
                break;
        }
        return result;
    }
}
