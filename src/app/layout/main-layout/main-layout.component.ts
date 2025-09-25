import { Component, ViewChild } from '@angular/core';
import {MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import { ClientTableComponent } from "../../clientComponent/client-table/client-table.component";
import { VatFormComponent } from "../../clientComponent/vat-form/vat-form.component";

@Component({
  selector: 'app-main-layout',
  imports: [MatTabsModule, ClientTableComponent, VatFormComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
@ViewChild("tabContainer") tabContainer !: MatTabGroup;
@ViewChild("clientTableTab") clientTable !: ClientTableComponent;



  afterClientInserted(isInserted : boolean) : void {
    if(isInserted){
      console.log("In main layout/tab Layout, client inserted indication arrived.");
      this.clientTable.getAllClients(0, 10, "id","desc");
      this.tabContainer.selectedIndex = 0;
    }
  }



}
