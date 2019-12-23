import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';
import { AgGridAngular } from 'ag-grid-angular';
import { CustomCellComponent } from '../custom-cell/custom-cell.component';

@Component({
  selector: 'app-custom-cell-render',
  templateUrl: './custom-cell-render.component.html',
  styleUrls: ['./custom-cell-render.component.css']
})
export class CustomCellRenderComponent implements OnInit {
  @ViewChild('agGrid', { static: true }) agGridName: AgGridAngular;
  public modules: Module[] = AllCommunityModules;
  private context;
  private gridColumnApi;
  private defaultColDef;
  private agGrid;
  private frameworkComponents;
  columnDefs = [
    {
      headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true, colId: "square"},
    { headerName: 'Model', field: 'model', sortable: true, filter: true },
    { headerName: 'Discounted Price', field: 'price', sortable: true, filter: true, cellRenderer: "squareRenderer", }
  ];

  rowData: any;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    this.defaultColDef = {
      editable: true,
      resizable: true
    };
    // assigning context
    this.context = { componentParent: this };
    console.log('this.modules', this.modules);
    this.frameworkComponents = {
      squareRenderer: CustomCellComponent,
    };
  }
  // code block for get selected value,
  getSelectedRows() {
    const selectedNodes = this.agGridName.api.getSelectedNodes();
    console.log('selectedNodes', selectedNodes);
    const selectedData = selectedNodes.map(node => node.data);
    console.log('selectedData', selectedData);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    console.log('selectedDataStringPresentation', selectedDataStringPresentation);
    //  alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onGridReady(params) {
    this.agGrid = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit(); // for resizing the table coloumns
  }
}
