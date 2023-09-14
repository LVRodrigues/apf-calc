import { Component } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { ApfService } from '../apf.service';

type DataT = {
    name: string;
    value: number;
};

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    chartOptions: EChartsOption;
    chartUpdate!: EChartsOption;

    private data: DataT[];
    private timer: any;

    constructor(public apf: ApfService) {
        this.chartOptions = this.prepareChartOptions();
        this.data = [];
        this.timer = setInterval(() => {
            this.data = [];
            this.data.push({ name: 'Planejamento', value: 10 });
            this.data.push({ name: 'Coordenação', value: 20 });
            this.data.push({ name: 'Desenvolvimento', value: 70 });
            this.data.push({ name: 'Testes', value: 50 });
            this.data.push({ name: 'Implantação', value: 20 });

            let prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                this.chartUpdate = {
                    series: {
                        data: this.data,
                        label: {
                            color: 'white'
                        },
                    },
                    legend: {
                        textStyle: {
                            color: 'white',
                        },
                    },
                };
            } else {
                this.chartUpdate = {
                    series: {
                        data: this.data,
                        label: {
                            color: 'black'
                        },
                    },
                    legend: {
                        textStyle: {
                            color: 'black',
                        },
                    },
                };
            }
        }, 1000);
    }

    prepareChartOptions(): EChartsOption {
        let result: EChartsOption = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} {a} ({d}%)',
                type: 'shadow',
            },
            legend: {
                align: 'auto',
                bottom: 10,
            },
            calculable: false,
            series: [
                {
                    name: 'Horas',
                    type: 'pie',
                    radius: [10, 50],
                    roseType: 'area',
                    data: this.data,
                }],
        };
        return result;
    }
}
