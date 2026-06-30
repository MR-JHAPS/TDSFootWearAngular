import { Component, ViewChild } from '@angular/core';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import { ClientTableComponent } from "../../clientComponent/client-table/client-table.component";
import { VatFormComponent } from "../../clientComponent/vat-form/vat-form.component";
import { SortBy } from '../../core/enum/sortBy';
import { SortDirection } from '../../core/enum/sortDirection';
import { MatIconModule } from '@angular/material/icon';
import { KharidTableComponent } from "../../clientComponent/kharid-table/kharid-table.component";

@Component({
  selector: 'app-main-layout',
  imports: [MatTabsModule, ClientTableComponent, VatFormComponent, MatIconModule, KharidTableComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
@ViewChild("tabContainer") tabContainer !: MatTabGroup;
@ViewChild("clientTableTab") clientTable !: ClientTableComponent;
@ViewChild("kharidTableTab") kharidTable !: KharidTableComponent;



  afterClientInserted(isInserted : boolean) : void {
    if(isInserted){
      console.log("In main layout/tab Layout, client inserted indication arrived.");
      this.clientTable.getAllClients(0, 10, SortBy.ID ,SortDirection.DESCENDING);
      this.tabContainer.selectedIndex = 0;
    }
  }

   afterKharidInserted(isInserted : boolean) : void {
    if(isInserted){
      console.log("In main layout/tab Layout, client inserted indication arrived.");
      this.kharidTable.getAllKharid(0, 10, SortBy.ID ,SortDirection.DESCENDING);
      this.tabContainer.selectedIndex = 1;
    }
  }



}
