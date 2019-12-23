import { Component, OnInit } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-customcell-dropdown',
  templateUrl: './customcell-dropdown.component.html',
  styleUrls: ['./customcell-dropdown.component.css']
})
export class CustomcellDropdownComponent implements OnInit, INoRowsOverlayAngularComp {
  value: any;
  agInit(params: any): void {
    this.value = params.value;
  }
  constructor() { }

  ngOnInit() {
  }

}
