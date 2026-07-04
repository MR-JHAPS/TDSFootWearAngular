import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ClientApiService } from '../core/services/clientApiService/client-api.service';
import { ClientRequest } from '../core/request/ClientRequest';
import { ClientResponse } from '../core/response/clientResponse';
import { ApiResponseModel } from '../core/response/ApiResponseModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { RtcNepaliDatePickerModule } from '@rishovt/angular-nepali-datepicker';
import { NepaliDateFormat } from '../core/request/NepaliDateFormat';
import { KharidApiService } from '../core/services/kharidApiService/kharid-api.service';


@Component({
  selector: 'app-update-client-modal',
  imports: [FormsModule,CommonModule, RtcNepaliDatePickerModule],
  templateUrl: './update-client-modal.component.html',
  styleUrl: './update-client-modal.component.css'
})
export class UpdateClientModalComponent implements OnInit {

  _router = inject(Router);
  _modalService = inject(BsModalService);
  _clientApiService = inject(ClientApiService);
  _kharidApiService = inject(KharidApiService);
  _toastrService = inject(ToastrService);

  openUpdateModal : boolean = false;

  clientId !: number;
  componentName !: string; 

  clientRequest : ClientRequest = new ClientRequest();
  clientResponse !: ClientResponse ;

  isLoading : boolean = false;

  onClientUpdate : Subject<boolean> = new Subject();



  ngOnInit(): void {
      this.getClientById();
  }


  calculateTotal():void{
    let total = 0;
    let amount = Number(this.clientRequest.amount);
    // let vat = Number(this.clientRequest.vatTax);
    let vat = (13/100)*amount;
    this.clientRequest.vatTax = vat;
    total = amount + vat;
    this.clientRequest.total = total.toString();
  }

  selectedDate: NepaliDateFormat = new NepaliDateFormat();
  
    pickerId = 'bill-date-update-picker';
  
    datepickerOptions = {
    classes: 'form-control',
    placeholder: 'Select Date',
    dateFormat: 'YYYY-MM-DD',
    closeOnDateSelect: true,
    unicodeDate: false
    };
  
    onDateChange(event: NepaliDateFormat) {
      this.selectedDate = event;
      this.clientRequest.yearInBs = this.selectedDate.year;
      this.clientRequest.monthInBs = this.selectedDate.month;
      this.clientRequest.dayInBs = this.selectedDate.day;
      // console.log(event);
      
      console.log("This is the current selected Date " + this.clientRequest.monthInBs);
    }
  






  onUpdateClick() : void {
    this.updateClientById();
  }



  verifyComponentType() : any {
    if(this.componentName==="client"){
      return this._clientApiService;
    }else{
      return this._kharidApiService;
    }
  }

  verifyComponentAction() : string {
    if(this.componentName==="client"){
      return "Client";
    }else{
      return "Kharid";
    }
  }




  getClientById() : void {
    //Dynamic APIService Selection and its method selection.
    this.verifyComponentType()[`get${this.verifyComponentAction()}ById`](this.clientId).subscribe({
      next : (response : ApiResponseModel<ClientResponse>) => {
        console.log("Client By ID : ", response.data);
        this.clientRequest = response.data;
      },
      error : (error : any)=>{
        console.log("Error occured while getting client By Id.", error)
      },
      complete : ()=>{
        console.log("Client By ID Obtained Successfully.");
      }
    })
  }






  updateClientById() : void{
    this.isLoading = true;
    // this._clientApiService.updateClientById(this.clientId, this.clientRequest).subscribe({
    this.verifyComponentType()[`update${this.verifyComponentAction()}ById`](this.clientId, this.clientRequest).subscribe({
      next : (response : ApiResponseModel<string>)=>{
        console.log("Updating Client by ID.");
        this.isLoading = false;
        this._toastrService.success("Client Updated Successfully.");
        this._modalService.hide();
        this.onClientUpdate.next(true);
      },
      error : (error: any)=>{
        console.log("Error occured while updating client By Id.", error)
        this._toastrService.error("Error Updating Client.");
        this.isLoading = false;
      },
      complete : ()=>{
        console.log("Client By Id Updated Successfully.");
        this.isLoading = false;
      }
    })
  }






}
