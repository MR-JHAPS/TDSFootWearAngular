import { Component, EventEmitter, HostListener, inject, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'
import { MatListItem } from "@angular/material/list";
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { ClientTableComponent } from "../clientComponent/client-table/client-table.component";
import { VatFormComponent } from "../clientComponent/vat-form/vat-form.component";
import { MainLayoutComponent } from "../layout/main-layout/main-layout.component";


@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatTabsModule, MatButtonModule, MatToolbarModule, MatMenuModule, MatListItem,
    RouterLink, RouterLinkActive, ClientTableComponent, VatFormComponent, MainLayoutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() toggleSideBar = new EventEmitter<void>;
  // private sideBarCommunication  = inject(SideBarCommunicationService);

  isMobile : boolean = false;
  isRoleAdmin : boolean = false;
  isRoleUser : boolean = false;



}


