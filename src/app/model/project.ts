import { Empirical } from "./empirical";
import { EmpiricalType } from "./empirical-type";
import { Factor } from "./factor";
import { FactorType } from "./factor-type";
import { InfluenceType } from "./influence-type";
import { Module } from "./module";

export class Project {
    name!: string ;
    description: string | undefined;
    responsible: string | undefined;
    date!: Date;
    version!: number;
    modules!: Module[];
    empiricals: Empirical[];
    factors: Factor[];

    constructor() {
        this.date       = new Date();
        this.modules    = [];
        this.version    = 1;
        this.empiricals = [];
        this.factors    = [];
        this.prepareEmpiricals();
        this.prepareFactors();
    }

    private prepareFactors() {
        Object.keys(FactorType).forEach((key, index) => {
            let data        = new Factor();
            data.id         = index;
            data.influence  = InfluenceType.ABSENT;
            this.factors.push(data);
        });
    }

    private prepareEmpiricals() {
        Object.keys(EmpiricalType).forEach((key, index) => {
            let data    = new Empirical();
            data.id     = index;
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
