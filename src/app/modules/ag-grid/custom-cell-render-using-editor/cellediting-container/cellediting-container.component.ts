import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CustomcellDropdownComponent } from '../customcell-dropdown/customcell-dropdown.component';
import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';
@Component({
  selector: 'app-cellediting-container',
  templateUrl: './cellediting-container.component.html',
  styleUrls: ['./cellediting-container.component.css']
})
export class CelleditingContainerComponent {

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private components;
  private rowData;
  private editType;
  private editingRowIndex;
  public modules: Module[] = AllCommunityModules;
  constructor() {
    this.setDefinition();
    // this.components = { numericCellEditor: this.getNumericCellEditor() };
    this.rowData = this.getRowData();
    this.editType = "cell";
  }

  onCellClicked($event) {
    // check whether the current row is already opened in edit or not
    if (this.editingRowIndex != $event.rowIndex) {
      console.log($event);
      $event.api.startEditingCell({
        rowIndex: $event.rowIndex,
        colKey: $event.column.colId
      });
      this.editingRowIndex = $event.rowIndex;
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
  setDefinition() {
    this.columnDefs = [
      {
        headerName: "Country",
        field: "country",
        valueGetter: function (params) {
          return params.data.dbModel.country;
        },
        valueSetter: function (params) {
          params.data.dbModel.country = params.newValue;
          return true;
        },
        keyCreator: function (params) {
          return params.data.dbModel.country;
        },
        // rowGroup: true,
      },
      {
        headerName: "Make",
        field: "make",
        editable: true,
        cellEditor: "agSelectCellEditor",
        rowDrag: true,
        cellEditorParams: {
          values: ["AAA", "BBB", "CCC"]
        },
        valueGetter: function (params) {
          return params.data.dbModel.make;
        },
        valueSetter: function (params) {
          params.data.dbModel.make = params.newValue;
          return true;
        }
      },
      {
        headerName: "Model",
        field: "model",
        editable: true,
        valueGetter: function (params) {
          return params.data.dbModel.model;
        },
        valueSetter: function (params) {
          params.data.dbModel.model = params.newValue;
          return true;
        }
      },
      {
        headerName: "Price",
        field: "price",
        editable: true,
        valueGetter: function (params) {
          return params.data.dbModel.price;
        },
        valueSetter: function (params) {
          params.data.dbModel.price = params.newValue;
          return true;
        }
        // cellEditor: "numericCellEditor"
      },
      {
        headerName: "Suppress Navigable",
        field: "field5",
        editable: true,
        suppressNavigable: true,
        valueGetter: function (params) {
          return params.data.dbModel.field5;
        },
        valueSetter: function (params) {
          params.data.dbModel.field5 = params.newValue;
          return true;
        }

      },
      {
        headerName: "Not Editable",
        field: "field6",
        editable: false,
        valueGetter: function (params) {
          return params.data.dbModel.field6;
        },
        valueSetter: function (params) {
          params.data.data.dbModel = params.newValue;
          return true;
        }
      }
    ];
  }
  getRowData() {
    var rowData = [];
    for (var i = 0; i < 10; i++) {
      rowData.push({
        dbModel: {
          make: "Porsche",
          model: "Boxter",
          price: 72000 + i * 1000,
          field5: "Sample 26",
          field6: "Sample 27",
          country: "GHANA"
        },
        viewModel: { isEdited: null },

      });
      rowData.push({
        dbModel: {
          make: "Porsche",
          model: "Boxter",
          price: 72000 + i * 1000,
          field5: "Sample 26",
          field6: "Sample 27",
          country: "GHANA"
        },
        viewModel: { isEdited: null },

      });
      rowData.push({
        dbModel: {
          make: "Porsche",
          model: "Boxter",
          price: 72000 + i * 1000,
          field5: "Sample 26",
          field6: "Sample 27",
          country: "GHANA"
        },
        viewModel: { isEdited: null },

      });

    }
    return rowData;
  }

  // fucntion for save data

  saveData() {
    console.log('save data executed', this.rowData);
  }

  onCellEditingStopped(params) {
    console.log('onCellEditingStopped', params);

  }
  onCellValueChanged(params) {
    if (params.newValue === params.oldValue) {
      return
    } else {
      params.data.viewModel.isEdited = true;
    }
    console.log('onCellValueChanged', params);
  }

}

