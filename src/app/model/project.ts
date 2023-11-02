import { Empirical } from "./empirical";
import { EmpiricalType } from "./empirical-type";
import { Factor } from "./factor";
import { FactorType } from "./factor-type";
import { InfluenceType } from "./influence-type";
import { Module } from "./module";
import { environment } from '../../environments/environment';

export class Project {
    name!: string ;
    description: string | undefined;
    responsible: string | undefined;
    date!: Date;
    version!: number;
    modules!: Module[];
    empiricals: Empirical[];
    factors: Factor[];
    
    private _productivity: number;

    constructor() {
        this.date           = new Date();
        this.modules        = [];
        this.version        = 1;
        this.empiricals     = [];
        this.factors        = [];
        this._productivity  = 1;
        this.prepareEmpiricals();
        this.prepareFactors();
    }

    public get productivity(): number {
        return this._productivity;
    }

    public set productivity(value: number) {
        if (value < environment.productivityMin || value > environment.productivityMax) {
            throw Error('Valor inválido para o índice de produtividade. Deve estar na faixa de '
                + environment.productivityMin + ' até ' + environment.productivityMax);
        }
        this._productivity = value;
    }

    private prepareFactors() {
        const keys = Object.keys(FactorType).filter((v) => isNaN(Number(v)));
        keys.forEach((key, index) => {
            let data        = new Factor();
            data.id         = FactorType[key as keyof typeof FactorType];
            data.influence  = InfluenceType.ABSENT;
            this.factors.push(data);
        });
    }

    private prepareEmpiricals() {
        const keys = Object.keys(EmpiricalType).filter((v) => isNaN(Number(v)));
        keys.forEach((key, index) => {
            let data    = new Empirical();
            data.id     = EmpiricalType[key as keyof typeof EmpiricalType];
            data.value  = 0;
            this.empiricals.push(data);
        });
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
