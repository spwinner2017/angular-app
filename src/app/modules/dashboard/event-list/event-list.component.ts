import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  columnDefs = [
    { headerName: 'Make', field: 'make', sortable: true, filter: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true },
    { headerName: 'Limit', field: 'limit', sortable: true, filter: true }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000, limit: 5262 },
    { make: 'Ford', model: 'Mondeo', price: 32000, limit: 5262 },
    { make: 'Toyota', model: 'Celica', price: 35000, limit: 5262 },
    { make: 'Ford', model: 'Mondeo', price: 32000, limit: 5262 },
    { make: 'Porsche', model: 'Boxter', price: 72000, limit: 5262 }
  ];
  constructor() { }

  ngOnInit() {
  }

}
