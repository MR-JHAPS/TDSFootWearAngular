import { ClientResponse } from "./clientResponse";



export interface WrapperClientResponse{

    client : Array<ClientResponse>;
    monthlyTotal : number;

}