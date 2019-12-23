import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAutocompleteComponent } from './components/custom-autocomplete/custom-autocomplete.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule 
     ],
    declarations: [
        CustomAutocompleteComponent
    ],
    exports: [
      CustomAutocompleteComponent
    ]
})
export class SharedModule {}