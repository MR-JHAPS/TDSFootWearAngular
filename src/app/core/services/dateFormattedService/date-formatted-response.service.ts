import { Injectable } from '@angular/core';
import { ClientResponse } from '../../response/clientResponse';
import { FormattedClientResponse } from '../../response/formattedClientResponse';
import { NepaliDateFormat } from '../../request/NepaliDateFormat';
import { FormattedClientRequest } from '../../request/FormattedClientRequest';

@Injectable({
  providedIn: 'root'
})
export class DateFormattedResponseService {

    // formattedCientList : Array<FormattedClientRequest> = new Array<FormattedClientRequest>;
    
    // formattedCientList : Array<FormattedClientResponse> = [];


  //Method:
    // formatClientResponse(rawResponseList : Array<ClientResponse>) : Array<FormattedClientResponse>{
    //   rawResponseList.forEach(client=>{
    //       let formattedClient : FormattedClientRequest = new FormattedClientRequest(); // this is to store the formatted date client
    //       let formattedDate : string = ""; // this is to store the string value of date
    //       formattedDate = client.yearInBs + "-" + client.monthInBs + "-" +client.dayInBs; // converting to single string value as a date.
    //       formattedClient.foomName = client.foomName;
    //       formattedClient.billNumber = client.billNumber;
    //       formattedClient.panNumber = client.panNumber;
    //       formattedClient.amount = client.amount;
    //       formattedClient.vatTax = client.vatTax;
    //       formattedClient.total = client.total;
    //       formattedClient.formattedDate = formattedDate;
    //       this.formattedCientList.push(formattedClient);
    //       console.log("this is the formatted client : " + formattedClient);
    //   })
    //   return this.formattedCientList;
    // }//ends method



    formatClientResponse(rawResponseList: ClientResponse[]): FormattedClientResponse[] {

        return rawResponseList.map(client => ({
          id: client.id,
          foomName: client.foomName,
          billNumber: client.billNumber,
          panNumber: client.panNumber,
          vatTax: client.vatTax,
          formattedDate: `${client.yearInBs}-${client.monthInBs}-${client.dayInBs}`,
          amount: client.amount,
          total: client.total
        }));

    }





}
