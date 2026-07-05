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
import { TableName } from '../../core/enum/tableName';
import { KharidApiService } from '../../core/services/kharidApiService/kharid-api.service';
import { RtcNepaliDatePickerModule } from '@rishovt/angular-nepali-datepicker';
import { NepaliDateFormat } from '../../core/request/NepaliDateFormat';
import { DataRefreshService } from '../../services/dataRefreshService/data-refresh.service';


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
    MatButtonModule, RtcNepaliDatePickerModule],
  templateUrl: './vat-form.component.html',
  styleUrl: './vat-form.component.css'
})



export class VatFormComponent {

  _dataRefreshService = inject(DataRefreshService);
  tableType  = TableName;
   selectedTableType : TableName = TableName.BIKRI; 
  _clientApiService = inject(ClientApiService);
  _kharidApiService = inject(KharidApiService);
  _toastrService = inject(ToastrService);
  // clientRequest : ClientRequest = new ClientRequest("", "" , "", new Date(), "", "", "");
  clientRequest : ClientRequest = new ClientRequest("", "" , "", "" , "" , "", "", "", "");
  @Output() isClientInsertedEmitter = new EventEmitter<boolean>(false);
  @Output() isKharidInsertedEmitter = new EventEmitter<boolean>(false);

  // value = new Value();


  selectedDate: NepaliDateFormat = new NepaliDateFormat();

  pickerId = 'bill-date-picker';

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






  calculateTotal():void{
    let total = 0;
    let amount = Number(this.clientRequest.amount);
    // let vat = Number(this.clientRequest.vatTax);
    let vat = (13/100)*amount;
    this.clientRequest.vatTax = vat;
    total = amount + vat;
    this.clientRequest.total = total.toString();
  }



  insertNewClient(){
    // let selectedTableType = this.tableType;
    if(this.selectedTableType === this.tableType.BIKRI){
        this._clientApiService.insertNewClient(this.clientRequest).subscribe({
          next : (response : ApiResponseModel<string>) => {
            console.log("Inserting clients.")
            this._toastrService.success("Client Saved Successfully.");
            this.isClientInsertedEmitter.emit(true);
            this._dataRefreshService.refresh();
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
    }else{
      this._kharidApiService.insertNewKharid(this.clientRequest).subscribe({
          next : (response : ApiResponseModel<string>) => {
            console.log("Inserting Kharid.")
            this._toastrService.success("Kharids Saved Successfully.");
            this.isKharidInsertedEmitter.emit(true);
            this.resetclientRequest();
          },
          error : (error)=>{
            console.log("Error inserting new Kharid");
            this.isKharidInsertedEmitter.emit(false);
          },
          complete : ()=> {
            console.log("Kharid Saved Successfully.");
          }
      })
    }

   
  }




  /* resets all the form data */
  resetclientRequest(){
    // this.clientRequest = new ClientRequest("", "" , "", new Date(), "", "", "");
    this.clientRequest = new ClientRequest("", "" , "", "", "", "", "", "", "");
  }



}
