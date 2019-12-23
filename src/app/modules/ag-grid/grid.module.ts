import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridRoutingModule } from './grid-routing.module';
import { GridContainerComponent } from './grid-container/grid-container.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridListComponent } from './grid-list/grid-list.component';
import { CustomCellRenderComponent } from './custom-cell-render/custom-cell-render.component';
import { CustomCellComponent } from './custom-cell/custom-cell.component';
import { CustomcellDropdownComponent } from './custom-cell-render-using-editor/customcell-dropdown/customcell-dropdown.component';
import { CelleditingContainerComponent } from './custom-cell-render-using-editor/cellediting-container/cellediting-container.component';
import { RowGroupingComponent } from './row-grouping/row-grouping.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GridRoutingModule,
        AgGridModule.withComponents([CustomCellComponent,CustomcellDropdownComponent])
    ],
    declarations: [
        GridContainerComponent,
        GridListComponent,
        CustomCellRenderComponent,
        CustomCellComponent,
        CustomcellDropdownComponent,
        CelleditingContainerComponent,
        RowGroupingComponent
    ],
    exports: [
    ],
    bootstrap:[GridContainerComponent]
})
export class GridModule { } 