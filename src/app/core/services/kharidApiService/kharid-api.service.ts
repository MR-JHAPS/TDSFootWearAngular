import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseModelPaginated } from '../../response/apiResponseModelPaginated';
import { ClientResponse } from '../../response/clientResponse';
import { ApiResponseModel } from '../../response/ApiResponseModel';
import { ClientRequest } from '../../request/ClientRequest';

@Injectable({
  providedIn: 'root'
})
export class KharidApiService {

  httpClient = inject(HttpClient);
  apiEndpoints = API_ENDPOINTS;
  

getAllKharids(pageNumber?: number, pageSize?: number, sortBy?:string, direction?: string) : Observable<ApiResponseModelPaginated<ClientResponse>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.getAllKharids}`;
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

  getKharidById(id : number) : Observable<ApiResponseModel<ClientResponse>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.getKharidById(id)}`;
    return this.httpClient.get<ApiResponseModel<ClientResponse>>(url);
  }

  insertNewKharid( clientRequest : ClientRequest) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.insertNewKharid}`;
    return this.httpClient.post<ApiResponseModel<string>>(url, clientRequest);
  }

  updateKharidById(id : number, clientRequest : ClientRequest) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.updateKharidById(id)}`;
    return this.httpClient.put<ApiResponseModel<string>>(url, clientRequest);
  }

  deleteKharidById(id : number) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.deleteKharidById(id)}`;
    return this.httpClient.delete<ApiResponseModel<string>>(url);
  }



  getRequestedPage(url : string) : Observable<ApiResponseModelPaginated<ClientResponse>>{
    return this.httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url);
  }


  searchKharid( searchQuery : string, pageNumber?: number, pageSize?: number,
               sortBy?:string, direction?: string
              ) : Observable<ApiResponseModelPaginated<ClientResponse>>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.searchKharid}`;
    let size = pageSize ? pageSize : 10;
      let number = pageNumber ? pageNumber : 0;
      let sortingBy = sortBy ? sortBy : "";
      let sortDirection = direction ? direction : "";
    const params = new HttpParams()
    .set("query", searchQuery)
    .set("size", size)
    .set("page" , number)
    .set("sortBy", sortingBy)
    .set("direction", sortDirection)
    return this.httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url,{params});
  }


  downloadExcelFileKharid(): Observable<Blob>{
    const url = `${this.apiEndpoints.baseUrl}${this.apiEndpoints.downloadFileKharid}`;
    // const url = "http://localhost:8080/api/client/download/clients";
    return this.httpClient.get<Blob>(url, {responseType:'blob' as 'json'} );
  }








}
