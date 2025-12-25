import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PaginationComponent } from "../../pagination/pagination.component";
import { ClientApiService } from '../../core/services/clientApiService/client-api.service';
import { ApiResponseModel } from '../../core/response/ApiResponseModel';
import { ClientResponse } from '../../core/response/clientResponse';
import { ApiResponseModelPaginated } from '../../core/response/apiResponseModelPaginated';
import { ApiPaginationLinks } from '../../core/response/ApiPaginationLinks';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateClientModalComponent } from '../../update-client-modal/update-client-modal.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SortDirection } from '../../core/enum/sortDirection';
import { SortBy } from '../../core/enum/sortBy';
import { MatIcon,MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { CdkObserveContent } from "@angular/cdk/observers";
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDivider } from "@angular/material/divider";
import { MatTabHeader } from "@angular/material/tabs";

export interface dataModel{
  key : string;
  value : SortDirection | SortBy;
  icon ?: string;
}



@Component({
  selector: 'app-client-table',
  imports: [PaginationComponent, MatDialogModule, MatButtonModule,
    FormsModule, MatInputModule, MatRadioModule, MatSelectModule, MatFormFieldModule, MatIcon, CdkObserveContent, ReactiveFormsModule, MatDivider, MatTabHeader],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent implements OnInit{

  clientApiService = inject(ClientApiService);
  clientResponseList!: Array<ClientResponse>;
  paginationLinks !: Array<ApiPaginationLinks>;

  _modalService = inject(BsModalService);
  bsModalRef ?: BsModalRef;
  readonly _dialog = inject(MatDialog);
  _toastrService = inject(ToastrService);
  currentContentSize  : number = 10;

  searchQuery : string = "";

  selectedSortDirection : string | SortDirection = SortDirection.ASCENDING;
  sortDirections : dataModel[] = [
    {key : "Ascending" , icon: "fa-solid fa-arrow-down-a-z", value: SortDirection.ASCENDING },
    {key : "Descending" ,icon: "fa-solid fa-arrow-up-z-a", value: SortDirection.DESCENDING }
  ];

  selectedSortBy : string | SortBy = SortBy.ID;
  sortBy : dataModel[] = [
    {key: "ID" , value: SortBy.ID },
    {key: "Client Name" , value: SortBy.CLIENTNAME },
    {key: "Date" , value: SortBy.DATE },
    {key: "Amount" , value: SortBy.AMOUNT },
    {key: "Vat Amount" , value: SortBy.VATAMOUNT },
    {key: "Total" , value: SortBy.TOTAL }
  ]

  searchControl = new FormControl('');
  isClientFound : boolean = true;



  ngOnInit(): void {
      this.getAllClients();

       this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe( searchValue =>{
      if(!searchValue || searchValue.trim()===""){
        this.getAllClients();
        return;
      }
      console.log("search query is " + searchValue);
      this.clientApiService.searchClient(searchValue! , 0 , this.currentContentSize, this.selectedSortBy, this.selectedSortDirection).subscribe({
         next : (response : ApiResponseModelPaginated<ClientResponse>) => {
              this.clientResponseList = response.data.content;
              this.paginationLinks = response.data.links;
              if(!this.clientResponseList || this.clientResponseList.length===0){
                this.isClientFound = false;
                console.log("client not found")
              }
              console.log(response);
            },
      error : (error) => console.log("Error Getting Searched Clients"),
      complete : () => console.log("Searched Clients Obtained Successfully") 
      });
      console.log(searchValue! + this.currentContentSize + this.selectedSortBy +  this.selectedSortDirection);
    })
  }


  clearSearch() : void {
    this.searchControl.reset();
    this.getAllClients();
  }
 
  downloadExcelFile():void {
    this.clientApiService.downloadExcelFile().subscribe({
      next : (blob : Blob) => {
        //creating link to download a file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tdsClients.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
        console.log(blob)
      },
      error : (error)=>{
        console.log("Error downloading the file");
      }
    })
  }



/* -------------------API CALLS (Get ALL CLIENTS/ Delete Clients)------------------------ */
  getAllClients(pageNumber?:number, pageSize?: number,
                sortBy?: string, direction?: string ) : void{
    this.clientApiService.getAllClients(pageNumber, pageSize, sortBy, direction).subscribe({
      next : (response : ApiResponseModelPaginated<ClientResponse>) => {
              this.clientResponseList = response.data.content;
               this.isClientFound  = this.clientResponseList ? true  : false;
              this.paginationLinks = response.data.links
            },
      error : (error) => console.log("Error Getting All Clients"),
      complete : () => console.log("All Clients Obtained Successfully") 

    })
  }

  deleteClientById(id : number):void{
    this.clientApiService.deleteClientById(id).subscribe({
      next : (response : ApiResponseModel<string>) => {
              console.log("Deleting Client By ID.");
              this.getAllClients();
            },
      error : (error) => console.log("Error Deleting  Client"),
      complete : () => console.log(" Client Deleted Successfully") 
    })
  }


  /* -------------------SORTING (SortBy/Direction)------------------------ */
  onSortClick(sortBy?: string, sortDirection ?: string) : void{
    this.getAllClients(undefined, undefined, sortBy, sortDirection);
  }





/* -------------------BUTTONS (INSERT/DELETE)------------------------ */
  openUpdateModal(id : number) :void{
    console.log("this is the selected client ID: " + id);
    this.bsModalRef = this._modalService.show(UpdateClientModalComponent, {
      initialState: {
        openUpdateModal : true,
        clientId : id,
      }
    })
    //subscribing to the variable of the updateModal page.
    this.bsModalRef.content.onClientUpdate.subscribe((updated:boolean)=>{
      if(updated){
        console.log("Client Updated, refreshing table ...");
        this.getAllClients();
      }
    })
  }

  //angular material dialog/modal is used here instead of bootstrap.
  openDeleteClientModal(id : number){
    console.log("open modal for delete the selected client ID: " + id);
    const dialogRef = this._dialog.open(DeleteModalComponent, {
      width: '400px',
      data: { id } // pass clientId to modal
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log("Deleting client with ID:", id);
        this.deleteClientById(id);
        
      }
    });
  }



  /* ------------------- PAGINTAION(NEXT/PREV/FIRST/LAST) ------------------------ */
  toRequestedPage(requestedPageUrl : string):void{
    this.clientApiService.getRequestedPage(requestedPageUrl).subscribe({
      next : (response : ApiResponseModelPaginated<ClientResponse>) => {
              this.clientResponseList = response.data.content;
              this.paginationLinks = response.data.links
            },
      error : (error) => console.log("Error Getting All Clients"),
      complete : () => console.log("All Clients Obtained Successfully") 

    });
  }


/* -------------------PAGINTAION (Content Size)------------------------ */




  changeContentSize(contentSize : number): void{
    console.log("changing content size : " + contentSize);
    this.currentContentSize  = contentSize;
    this.getAllClients(0, contentSize);
  }


}
