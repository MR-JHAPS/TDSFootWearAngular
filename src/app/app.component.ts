import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VatFormComponent } from './clientComponent/vat-form/vat-form.component';
import { HeaderComponent } from "./header/header.component";
import { ClientTableComponent } from "./clientComponent/client-table/client-table.component";
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vatManager';
}
