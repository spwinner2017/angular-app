import { Component, OnInit } from '@angular/core';
import { Module, AllCommunityModules } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-row-grouping',
  templateUrl: './row-grouping.component.html',
  styleUrls: ['./row-grouping.component.css']
})
export class RowGroupingComponent  {
  private gridApi;
  private gridColumnApi;
  public modules: Module[] = AllCommunityModules;
  private columnDefs;
  private defaultColDef;
  private rowData:any;
// implementation of ag grid 
  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: "Country",
        field: "country",
        width: 120,       
        // enableRowGroup:true
      },
      {
        headerName: "Year",
        field: "year",
        width: 90
       
      },
      {
        headerName: "Sport",
        field: "sport",
        width: 110
      },
      {
        headerName: "Athlete",
        field: "athlete",
        width: 200
      },
      {
        headerName: "Gold",
        field: "gold",
        width: 100
      },
      {
        headerName: "Silver",
        field: "silver",
        width: 100
      },
      {
        headerName: "Bronze",
        field: "bronze",
        width: 100
      },
      {
        headerName: "Total",
        field: "total",
        width: 100
      },
      {
        headerName: "Age",
        field: "age",
        width: 90
      },
      {
        headerName: "Date",
        field: "date",
        width: 110
      }
    ];
    this.defaultColDef = {
      sortable: true,
      filter: true
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe(data => {
        this.rowData = data;
      });
  }
}
