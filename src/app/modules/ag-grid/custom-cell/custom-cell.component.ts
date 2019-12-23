import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-custom-cell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.css']
})
export class CustomCellComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public valueSquared(): number {
    return this.params.value - 2000;
  }

  ngOnDestroy() {
    console.log(`Destroying SquareComponent`);
  }

  refresh(): boolean {
    return false;
  }
}
