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
            this.updateData();

            let preferColor = '';
            let prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                preferColor = 'white';
            } else {
                preferColor = 'black';
            }
            this.chartUpdate = {
                series: {
                    data: this.data,
                    label: {
                        color: preferColor,
                    },
                },
                legend: {
                    show: true,
                    textStyle: {
                        color: preferColor,
                    },
                },
                toolbox: {
                    iconStyle: {
                        borderColor: preferColor,
                    },
                }
            };
        }, 1000);
    }
    
    private updateData(): void {
        const score = this.apf.project.value;
        this.data = [];
        this.data.push({ name: 'Planejamento', value: score*0.1 });
        this.data.push({ name: 'Coordenação', value: score*0.3 });
        this.data.push({ name: 'Desenvolvimento', value: this.apf.project.value });
        this.data.push({ name: 'Testes', value: score*0.4 });
        this.data.push({ name: 'Implantação', value: score*0.1 });
    }

    prepareChartOptions(): EChartsOption {
        let result: EChartsOption = {
            title: {
                show: false,
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} {a} ({d}%)',
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
            },
            center: ['50%', '50%'],
            series: [
                {
                    name: 'Horas',
                    type: 'pie',
                    radius: [10, 50],
                    roseType: 'area',
                    data: this.data,
                    width: 'auto' ,
                    height: 'auto' ,
                }],
        };
        return result;
    }
}
