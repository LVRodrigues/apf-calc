import { Empirical } from "./empirical";
import { EmpiricalType } from "./empirical-type";
import { Factor } from "./factor";
import { FactorType } from "./factor-type";
import { InfluenceType } from "./influence-type";
import { Module } from "./module";
import { environment } from '../../environments/environment';
import { env } from "process";

const FACTOR_K: number = 0.3188;
const WORKING_HOURS: number = 168;
const WORKING_DAYS: number = 21;
const WORKING_DAY: number = WORKING_HOURS / WORKING_DAYS;

// A distribuição das porcentagens para a tabela de esforço, prazo, dias úteis e recursos 
// é para apoiar a distribuição das unidades e não tem por objetivo definir como o 
// projeto deverá ser planejado efetivamente.
const EFFORT_PERCENT_STARTUP: number = 5 / 100;
const EFFORT_PERCENT_ELABORATION: number = 20 / 100;
const EFFORT_PERCENT_BUILD: number = 65 / 100;
const EFFORT_PERCENT_TRANSITION: number = 10 / 100;

const DEADLINE_PERCENT_STARTUP: number = 10 / 100;
const DEADLINE_PERCENT_ELABORATION: number = 30 / 100;
const DEADLINE_PERCENT_BUILD: number = 50 / 100;
const DEADLINE_PERCENT_TRANSITION: number = 10 / 100;

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
        return result;
    }

    public get adjustments(): number {
        let result = 1;
        let tdi = 0;
        this.factors.forEach(factor => tdi += factor.influence);
        if (tdi > 0) {
            result = (tdi * 0.01) + 0.65;
        }
        return result;
    }

    public get score(): number {
        return this.value * this.adjustments;
    }

    public get months(): number {
        let result = 1;
        if (this.score > 50) {
            result = this.varJ() * (((this.score * this.varE()) / WORKING_HOURS) ** FACTOR_K);
        }
        return result;
    }

    public get scorePerMonth(): number {
        return this.hours / this.months;
    }

    public get scorePerHour(): number {
        return this.scorePerMonth / WORKING_HOURS;
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

    public get effortStartup(): number {
        return this.hours * EFFORT_PERCENT_STARTUP;
    }

    public get effortElaboration(): number {
        return this.hours * EFFORT_PERCENT_ELABORATION;
    }

    public get effortBuild(): number {
        return this.hours * EFFORT_PERCENT_BUILD;
    }

    public get effortTransition(): number {
        return this.hours * EFFORT_PERCENT_TRANSITION;
    }

    public get deadlineStartup(): number {
        return this.months * WORKING_DAYS * DEADLINE_PERCENT_STARTUP;
    }

    public get deadlineElaboration(): number {
        return this.months * WORKING_DAYS * DEADLINE_PERCENT_ELABORATION;
    }

    public get deadlineBuild(): number {
        return this.months * WORKING_DAYS * DEADLINE_PERCENT_BUILD;
    }

    public get deadlineTransition(): number {
        return this.months * WORKING_DAYS * DEADLINE_PERCENT_TRANSITION;
    }    

    public get resourceStartup(): number {
        return this.effortStartup / WORKING_DAY / this.deadlineStartup;
    }

    public get resourceElaboration(): number {
        return this.effortElaboration / WORKING_DAY / this.deadlineElaboration;
    }

    public get resourceBuild(): number {
        return this.effortBuild / WORKING_DAY / this.deadlineBuild;
    }

    public get resourceTransition(): number {
        return this.effortTransition / WORKING_DAY / this.deadlineTransition;
    }    
}
