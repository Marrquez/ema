import { Component, OnInit, Input } from '@angular/core';
import { GoogleChartService } from  '../service/google-chart.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-columns-chart',
  templateUrl: './columns-chart.component.html',
  styleUrls: ['./columns-chart.component.sass']
})
export class ColumnsChartComponent implements OnInit {
  private gLib: any;
  @Input() notify: Subject<any>;
  chartData = null;

  constructor(private gChartService : GoogleChartService) {}

  ngOnInit(): void {
    this.notify.subscribe((data: any) => {
      this.chartData = data;
      this.gLib = this.gChartService.getGoogle();
      this.gLib.charts.load('current', {'packages':['corechart']});
      this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
    });
  }

  private drawChart() {
    let data = this.gLib.visualization.arrayToDataTable(this.chartData);
    var view = new this.gLib.visualization.DataView(data);

    view.setColumns([0, 1, {
      calc: "stringify",
      sourceColumn: 1,
      type: "string",
      role: "annotation",
    }, 2]);

    var options = {
      // isStacked: 'percent',
      title: "Mi solución",
      vAxis: {
        minValue: 0,
        maxValue: 100,
        format: '#\'%\''
      },
      width: 320,
      height: 300,
      bar: {groupWidth: "95%"},
      legend: { position: "none" },
    };

    let chart = new this.gLib.visualization.ColumnChart(document.getElementById('divColumnsChart'));

    chart.draw(view, options);
  }
}
