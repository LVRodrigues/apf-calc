import { Empirical } from "./empirical";
import { EmpiricalType } from "./empirical-type";
import { Factor } from "./factor";
import { FactorType } from "./factor-type";
import { InfluenceType } from "./influence-type";
import { Module } from "./module";
import { environment } from '../../environments/environment';
import { env } from "process";

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
        this._productivity  = 14;
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
            switch (data.id) {
                case EmpiricalType.COORDINATION:
                    data.value = +environment.empiricalCoordination;
                    break;
                case EmpiricalType.IMPLANTATION:
                    data.value = +environment.empiricalImplantation;
                    break;
                case EmpiricalType.PLANNING:
                    data.value = +environment.empiricalPlanning;
                    break;
                case EmpiricalType.TESTS:
                    data.value = +environment.empiricalTests;
                    break;
            }
            this.empiricals.push(data);
        });
    }

    public module(id: number): Module | undefined {
        let result = this.modules.find(value => value.id === id);
        return result;
    }

    public get value(): number {
        let result = 0;
        this.modules.forEach(item => result += item.value);
        return 601; //result; // FIXME Corigir cálculo de pontos defunção
    }

    public get adjustments(): number {
        let tdi = 0;
        this.factors.forEach(factor => tdi += factor.influence);
        return (tdi * 0.01) + 0.65;
    }

    public get score(): number {
        return this.value * this.adjustments;
    }

    public get months(): number {
        let result = 1;
        if (this.score > 50) {
            result = this.varJ() * (((this.score * this.varE()) / 168) ** 0.3188);
        }
        return result;
    }

    public get hours(): number {
        return this.score * this.productivity;
    }

    private varJ(): number {
        let result = 0;
        switch (true) {
            case (this.score < 300):
                result = 2;
                break;
            case (this.score < 1000):
                result = 2.5;
                break;
            default:
                result = 3;
        }
        return result;
    }

    private varE(): number {
        let result = 0;
        switch (true) {
            case (this.score < 300):
                result = 5;
                break;
            case (this.score < 1000):
                result = 7.5;
                break;
            default:
                result = 10;
        }
        return result;
    }
}
