import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModule } from './service/service.module';
import { BarsChartComponent } from './bars-chart/bars-chart.component';
import { ColumnsChartComponent } from './columns-chart/columns-chart.component';

@NgModule({
  declarations: [
    BarsChartComponent,
    ColumnsChartComponent,
  ],
  imports: [
    CommonModule,
    ServiceModule,
  ],
  exports: [
    BarsChartComponent,
    ColumnsChartComponent,
  ],
  providers : []
})
export class GoogleChartModule { }
