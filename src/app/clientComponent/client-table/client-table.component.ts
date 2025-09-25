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

@Component({
  selector: 'app-client-table',
  imports: [PaginationComponent, MatDialogModule,MatButtonModule],
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


  ngOnInit(): void {
      this.getAllClients();
  }

 

  getAllClients(pageNumber?:number, pageSize?: number,
                sortBy?: string, direction?: string ) : void{
    this.clientApiService.getAllClients(pageNumber, pageSize, sortBy, direction).subscribe({
      next : (response : ApiResponseModelPaginated<ClientResponse>) => {
              this.clientResponseList = response.data.content;
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



  changeContentSize(contentSize : number): void{
    console.log("changing content size : " + contentSize);
    this.getAllClients(0, contentSize);
    
  }


}
