import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html',
  styleUrls: ['./custom-autocomplete.component.css']
})
export class CustomAutocompleteComponent implements OnInit {

  itemList: any[] = []; // for collection selcted items
  userInputs: any;
  model = 'some text';
  constructor() { }
  // event emiters for passing data to parent componet.
  @Output() handelItemSelection: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {

  }
  handelOnItemKeyUp(event) {
    if (event.target.value) {
      let userInput: string = event.target.value;
      let splitChar = userInput.charAt(userInput.length - 1);
      let tempArray: any[] = userInput.split(',');
      if (tempArray.length > 1) {
        if (tempArray[0] != "" && tempArray[0] != undefined) {
          this.itemList.push(tempArray[0]);
          console.log('this.itemList',this.itemList.length);
          this.handelItemSelection.emit(this.itemList); //passing updated items to parent
        }
      }
      console.log('')
      splitChar == ',' ? event.target.value = null : '' // setting empty value to text box when user enter ,
      document.getElementById("input-text").focus();
    }
  }
  // code block for handel item removal from list.
  handelOnItemRemove(index: number) {
    this.itemList.splice(index, 1);
    this.handelItemSelection.emit(this.itemList); //passing updated items to parent
  }
}