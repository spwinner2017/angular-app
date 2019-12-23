import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModules, Module } from "@ag-grid-community/all-modules";

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css']
})
export class GridListComponent implements OnInit {
  @ViewChild('agGrid', { static: true }) agGridName: AgGridAngular;
  public modules: Module[] = AllCommunityModules;
  private gridColumnApi;
  private defaultColDef;
  private agGrid;
  columnDefs = [
    { headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true }
  ];

  rowData: any;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    this.defaultColDef = {
      editable: true,
      resizable: true
    };
    console.log('this.modules',this.modules);
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
