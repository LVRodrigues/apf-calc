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
    chartUpdate!: EChartsOption;

    private data: Data[];
    private links: Link[];

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
                category: (fun instanceof FunctionData)?this.CATEGORY_DATA.id:this.CATEGORY_TRANSACTION.id
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
        let result: EChartsOption = {
            title: {},
            tooltip: {},
            legend: {
                align: 'auto'
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    symbolSize: [75, 20],
                    symbol: 'roundRect',
                    data: this.data,
                    links: this.links,
                    categories: this.CATEGORIES,
                    roam: true,
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    force: {
                        repulsion: 300,
                        edgeLength: 50
                    }
                }
            ]
        };
        return result;
    }
}

