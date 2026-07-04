import { Injectable } from '@angular/core';
import { WrapperClientResponse } from '../../response/WrapperClientResponse';
import { FormattedWrapperClientResponse } from '../../response/FormattedWrapperClientResponse';
import { ClientResponse } from '../../response/clientResponse';
import { FormattedClientResponse } from '../../response/formattedClientResponse';

@Injectable({
  providedIn: 'root'
})
export class DateFormattedResponseService {

    // formattedCientList : Array<FormattedClientRequest> = new Array<FormattedClientRequest>;
    
    // formattedCientList : Array<FormattedClientResponse> = [];


  //Method:
    formatClientResponse(rawResponseList : ClientResponse[]) : FormattedClientResponse[]{
      return rawResponseList.map( client => ({
          id : client.id,
          formattedDate : `${client.yearInBs}-${client.monthInBs}-${client.dayInBs}`, // converting to single string value as a date.
          foomName : client.foomName,
          billNumber : client.billNumber,
          panNumber : client.panNumber,
          amount : client.amount,
          vatTax : client.vatTax,
          total : client.total,
          
      }));
    }//ends method



    formatWrappedClientResponse(rawWrappedResponseList: WrapperClientResponse[]): FormattedWrapperClientResponse[] {

        return rawWrappedResponseList.map(wrappedClient => ({
          /* client : ... is the field name of the Class/Interface that I want to return in this method */
          client : wrappedClient.client.map(c =>({
            id: c.id,
            foomName: c.foomName,
            billNumber: c.billNumber,
            panNumber: c.panNumber,
            vatTax: c.vatTax,
            formattedDate: `${c.yearInBs}-${c.monthInBs}-${c.dayInBs}`,
            amount: c.amount,
            total: c.total
          })),

          /* monthlyTotal : ... is the field name of the Class/Interface that I want to return in this method */
           monthlyTotal : wrappedClient.monthlyTotal
          }));

    }





}
