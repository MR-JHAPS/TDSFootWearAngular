import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { CdkObserveContent } from '@angular/cdk/observers';
import { MatDivider } from '@angular/material/divider';
import { ApiResponseModelPaginated } from '../../core/response/apiResponseModelPaginated';
import { WrapperClientResponse } from '../../core/response/WrapperClientResponse';
import { ClientApiService } from '../../core/services/clientApiService/client-api.service';
import { DateFormattedResponseService } from '../../core/services/dateFormattedService/date-formatted-response.service';
import { FormattedWrapperClientResponse } from '../../core/response/FormattedWrapperClientResponse';
import { ApiPaginationLinks } from '../../core/response/ApiPaginationLinks';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SortDirection } from '../../core/enum/sortDirection';
import { dataModel } from '../client-table/client-table.component';
import { SortBy } from '../../core/enum/sortBy';
import { NepaliDateFormat } from '../../core/request/NepaliDateFormat';
import { ApiResponseModel } from '../../core/response/ApiResponseModel';
import { UpdateClientModalComponent } from '../../update-client-modal/update-client-modal.component';

@Component({
  selector: 'app-client-monthly-table',
  imports: [PaginationComponent, MatDialogModule, MatButtonModule,
    FormsModule, MatInputModule, MatRadioModule, MatSelectModule, MatFormFieldModule, MatIcon, CdkObserveContent, ReactiveFormsModule, MatDivider],
  templateUrl: './client-monthly-table.component.html',
  styleUrl: './client-monthly-table.component.css'
})
export class ClientMonthlyTableComponent {


  clientApiService = inject(ClientApiService);
  dateFormattedResponseService = inject(DateFormattedResponseService);
  clientResponseList!: Array<WrapperClientResponse>;
  formattedWrappedClientResponseList !: Array<FormattedWrapperClientResponse>;
  paginationLinks !: Array<ApiPaginationLinks>;

  

  private searchSubscription?: Subscription;

  _modalService = inject(BsModalService);
  bsModalRef ?: BsModalRef;
  readonly _dialog = inject(MatDialog);
  _toastrService = inject(ToastrService);
  currentContentSize  : number = 10;

  searchQuery : string = "";

  selectedSortDirection : string | SortDirection = SortDirection.ASCENDING;
  sortDirections : dataModel[] = [
    {key : "ascending" , icon: "fa-solid fa-arrow-down-a-z", value: SortDirection.ASCENDING },
    {key : "descending" ,icon: "fa-solid fa-arrow-up-z-a", value: SortDirection.DESCENDING }
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

  // formattedYearList : Array<string> = new Array<string>();

  searchControl = new FormControl('');
  isClientFound : boolean = true;

  formattedDate : NepaliDateFormat = new NepaliDateFormat();



  ngOnInit(): void {
      this.getAllClients();

       /* this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe( searchValue =>{
      // 1. If a previous search is still running, CANCEL it
      if (this.searchSubscription) {
        this.searchSubscription.unsubscribe();
      }

      if(!searchValue || searchValue.trim()===""){
        this.getAllClients();
        return;
      }
      console.log("search query is " + searchValue);
      this.searchSubscription = this.clientApiService.searchClient(searchValue! , 0 , this.currentContentSize, this.selectedSortBy, this.selectedSortDirection).subscribe({
        next : (response : ApiResponseModelPaginated<WrapperClientResponse>) => {
            this.clientResponseList = response.data.content;
            this.paginationLinks = response.data.links;
            this.isClientFound = !!(this.clientResponseList && this.clientResponseList.length>0);
            console.log("client not found")
            console.log(response);
          },
        error : (error) => {
          console.log("Error Search", error);
          this.isClientFound = false;
          }
      });
      console.log(searchValue! + this.currentContentSize + this.selectedSortBy +  this.selectedSortDirection);
    }) */
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

  formatDateInOne(){
    const responseClientData = this.clientResponseList;

  }

/* -------------------API CALLS (Get ALL CLIENTS/ Delete Clients)------------------------ */
  getAllClients(pageNumber?:number, pageSize?: number,
                sortBy?: string, direction?: string ) : void{
    this.clientApiService.getAllClientsMonthly(pageNumber, pageSize, sortBy, direction).subscribe({
      next : (response : ApiResponseModelPaginated<WrapperClientResponse>) => {
              this.clientResponseList = response.data.content;
              this.formattedWrappedClientResponseList = this.dateFormattedResponseService.formatWrappedClientResponse(this.clientResponseList);
              this.isClientFound  = this.clientResponseList ? true  : false;
              this.paginationLinks = response.data.links;
              console.log(this.clientResponseList);
              console.log(response);
              console.log(this.formattedWrappedClientResponseList);
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
 /*  openDeleteClientModal(id : number){
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
  } */



  /* ------------------- PAGINTAION(NEXT/PREV/FIRST/LAST) ------------------------ */
  toRequestedPage(requestedPageUrl : string):void{
    this.clientApiService.getWrappedRequestedPage(requestedPageUrl).subscribe({
      next : (response : ApiResponseModelPaginated<WrapperClientResponse>) => {
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
