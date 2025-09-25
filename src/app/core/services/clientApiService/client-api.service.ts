import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../response/ApiResponseModel';
import { ClientResponse } from '../../response/clientResponse';
import { ClientRequest } from '../../request/ClientRequest';
import { ApiResponseModelPaginated } from '../../response/apiResponseModelPaginated';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  httpClient = inject(HttpClient);
  apiEndpoints = API_ENDPOINTS;


  getAllClients(pageNumber?: number, pageSize?: number, sortBy?:string, direction?: string) : Observable<ApiResponseModelPaginated<ClientResponse>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.getAllClients}`;
    let size = pageSize ? pageSize : 10;
      let number = pageNumber ? pageNumber : 0;
      let sortingBy = sortBy ? sortBy : "";
      let sortDirection = direction ? direction : "";
      const params = new HttpParams()
      .set("size", size)
        .set("page" , number)
        .set("sortBy", sortingBy)
        .set("direction", sortDirection)
    return this.httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url,{params});
  }

  getClientById(id : number) : Observable<ApiResponseModel<ClientResponse>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.getClientById(id)}`;
    return this.httpClient.get<ApiResponseModel<ClientResponse>>(url);
  }

  insertNewClient( clientRequest : ClientRequest) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.insertNewClient}`;
    return this.httpClient.post<ApiResponseModel<string>>(url, clientRequest);
  }

  updateClientById(id : number, clientRequest : ClientRequest) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.updateClientById(id)}`;
    return this.httpClient.put<ApiResponseModel<string>>(url, clientRequest);
  }

  deleteClientById(id : number) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.deleteClientById(id)}`;
    return this.httpClient.delete<ApiResponseModel<string>>(url);
  }



  getRequestedPage(url : string) : Observable<ApiResponseModelPaginated<ClientResponse>>{
    return this.httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url);
  }




}
