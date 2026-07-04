import { Component, ViewChild } from '@angular/core';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ClientTableComponent } from '../../clientComponent/client-table/client-table.component';
import { MatIconModule } from '@angular/material/icon';
import { ClientMonthlyTableComponent } from '../../clientComponent/client-monthly-table/client-monthly-table.component';

@Component({
  selector: 'app-client-layout',
  imports: [MatTabsModule, ClientTableComponent, MatIconModule, ClientMonthlyTableComponent],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {

  
  @ViewChild("tabContainer") tabContainer !: MatTabGroup;
  @ViewChild("clientTableTab") clientTable !: ClientTableComponent;
  @ViewChild("clientMonthlyTableTab") clientMonthlyTable !: ClientMonthlyTableComponent;




}//ends class
