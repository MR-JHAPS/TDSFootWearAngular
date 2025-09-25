import { Component, EventEmitter, inject, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClientApiService } from '../../core/services/clientApiService/client-api.service';
import { ClientRequest } from '../../core/request/ClientRequest';
import { ApiResponseModel } from '../../core/response/ApiResponseModel';
import { ToastrService } from 'ngx-toastr';


// export class Value{
//   constructor(
//     public foom : string ="",
//     public billNumber  :string ="",
//     public panNumber : string = "",
//     public amount : string = "",
//     public vatTax : string = "",
//     public total :string = ""

//   ){}
// }



@Component({
  selector: 'app-vat-form',
  imports: [MatInputModule, MatIconModule, FormsModule, MatFormFieldModule,
    MatButtonModule],
  templateUrl: './vat-form.component.html',
  styleUrl: './vat-form.component.css'
})



export class VatFormComponent {

  _clientApiService = inject(ClientApiService);
  _toastrService = inject(ToastrService);
  clientRequest : ClientRequest = new ClientRequest("", "" , "", new Date(), "", "", "");
  @Output() isClientInsertedEmitter = new EventEmitter<boolean>(false);

  // value = new Value();




  insertNewClient(){
    this._clientApiService.insertNewClient(this.clientRequest).subscribe({
      next : (response : ApiResponseModel<string>) => {
        console.log("Inserting clients.")
        this._toastrService.success("Client Saved Successfully.");
        this.isClientInsertedEmitter.emit(true);
        this.resetclientRequest();
      },
      error : (error)=>{
        console.log("Error inserting new Client");
        this.isClientInsertedEmitter.emit(false);
      },
      complete : ()=> {
        console.log("Client Saved Successfully.");
      }
    })
  }




  /* resets all the form data */
  resetclientRequest(){
    this.clientRequest = new ClientRequest("", "" , "", new Date(), "", "", "");
  }



}
