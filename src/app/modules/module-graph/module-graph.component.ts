import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { ApfService } from 'src/app/apf.service';
import { FunctionData, FunctionTransaction } from 'src/app/model/function';
import { Module } from 'src/app/model/module';

type Category = {
    id: number;
    name: string;
}

type Data = {
    id: string;
    name: string;
    category: number;
    value: number;
};

type Link = {
    source: string;
    target: string;
}

@Component({
    selector: 'app-module-graph',
    templateUrl: './module-graph.component.html',
    styleUrls: ['./module-graph.component.scss']
})
export class ModuleGraphComponent {

    private CATEGORY_DATA : Category = {
        id: 0,
        name: 'Dados'
    };
    private CATEGORY_TRANSACTION : Category = {
        id: 1,
        name: 'Transação'
    };
    private CATEGORIES: Category[] = [this.CATEGORY_DATA, this.CATEGORY_TRANSACTION];

    module: Module;

    chartOptions: EChartsOption;

    private data: Data[];
    private links: Link[];
    private timer: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private apf: ApfService
    ) {
        this.module = new Module();
        this.activatedRoute.paramMap.subscribe((params) => {
            let id      = +params.get('id')!;
            this.module = this.apf.project.module(id)!;
        });
        this.data           = this.loadData();
        this.links          = this.loadLinks();
        this.chartOptions   = this.prepareChartOptions();
    }

    loadData(): Data[] {
        let result : Data[] = [];
        this.module.functions.forEach((fun) => {
            let data : Data = {
                id: fun.id.toString(),
                name: fun.name,
                category: (fun instanceof FunctionData)?this.CATEGORY_DATA.id:this.CATEGORY_TRANSACTION.id,
                value: fun.value
            };
            result.push(data);
        })
        return result;
    }

    loadLinks(): Link[] {
        let result : Link[] = [];
        this.module.functions.forEach((fun) => {
            if (fun instanceof FunctionTransaction) {
                fun.alrs.forEach((data) => {
                    let link: Link = {
                        source: data.id.toString(),
                        target: fun.id.toString(),
                    };
                    result.push(link);
                })
            }
        });
        return result;
    }

    prepareChartOptions(): EChartsOption {
        let prefersColor = '';
        let prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
            prefersColor = 'white';
        } else {
            prefersColor = 'black' ;
        }
        let result: EChartsOption = {
            title: {},
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} pontos.',
                type: 'shadow',
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        title: 'Salvar imagem'
                    },
                    restore: {
                        title: 'Restaurar'
                    },
                },
                bottom: '10'
            },
            legend: {
                align: 'auto',
                textStyle: {
                    color: prefersColor,
                }
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    force: {
                        repulsion: 300,
                        edgeLength: 150,
                        initLayout: 'circular'
                    },
                    symbolSize: [25, 25],
                    symbol: 'circle',
                    data: this.data,
                    links: this.links,
                    categories: this.CATEGORIES,
                    roam: true,
                    label: {
                        show: true,
                        position: [0, 30],
                        color: prefersColor,
                    },
                }
            ]
        };
        return result;
    }
}

