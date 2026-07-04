import { Component, ViewChild } from '@angular/core';
import { KharidTableComponent } from '../../clientComponent/kharid-table/kharid-table.component';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { KharidMonthlyTableComponent } from '../../clientComponent/kharid-monthly-table/kharid-monthly-table.component';

@Component({
  selector: 'app-kharid-layout',
  imports: [MatTabsModule, KharidTableComponent, MatIconModule, KharidMonthlyTableComponent],
  templateUrl: './kharid-layout.component.html',
  styleUrl: './kharid-layout.component.css'
})
export class KharidLayoutComponent {
   
  @ViewChild("tabContainer") tabContainer !: MatTabGroup;
  @ViewChild("kharidTableTab") kharidTable !: KharidTableComponent;
  @ViewChild("kharidMonthlyTableTab") kharidMonthlyTable !: KharidMonthlyTableComponent;




}
