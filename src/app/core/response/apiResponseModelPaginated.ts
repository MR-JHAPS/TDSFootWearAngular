import { ApiPageDetails } from "./ApiPageDetails";
import { ApiPaginationLinks } from "./ApiPaginationLinks";

export interface ApiResponseModelPaginated<T>{

    message : string;
    timestamp : Date;
    data : {
        links: Array<ApiPaginationLinks>,
            content : Array<T>,
            page: ApiPageDetails   
    }



}