import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})

export class DonaComponent {
  @Input() title: string = 'Sales';

  // Doughnut
  doughnutChartLabels: string[] = [ 'Label 1', 'Label 2', 'Label 3' ];
  @Input('datos') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: [350, 150, 100], 
        backgroundColor: [ '#0096c7', '#d62828', '#FFB414' ]
      },
      /* { data: [ 50, 150, 120 ] },
      { data: [ 250, 130, 70 ] } */
    ]
  };

  doughnutChartType: ChartType = 'doughnut';
}
