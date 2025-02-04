import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsChartComponent } from './bars-chart.component';

describe('ColumnsChartComponent', () => {
  let component: BarsChartComponent;
  let fixture: ComponentFixture<BarsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
