import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ClientTableComponent } from './clientComponent/client-table/client-table.component';
import { VatFormComponent } from './clientComponent/vat-form/vat-form.component';

export const routes: Routes = [

    {path:"", component:MainLayoutComponent, children:[
        { path: "", redirectTo: "homepage", pathMatch: "full" }, // default route
        { path : "homepage", component: ClientTableComponent},
        { path:"clientForm", component: VatFormComponent},
        { path: "**", redirectTo: "homepage" } // wildcard for unknown paths

    ]}
        


];
