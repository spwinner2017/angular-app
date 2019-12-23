import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent implements OnInit {
  itemList: any[] = [];
  constructor() { }

  ngOnInit() {
  }
  // hande action selection of removal from list box
  handelItemAction(seletdItems: any[]) {
    console.log('selected items', seletdItems)
  }
}
