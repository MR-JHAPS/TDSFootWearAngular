import { FormattedClientResponse } from "./formattedClientResponse";

export interface FormattedWrapperClientResponse{

    client : Array<FormattedClientResponse>;
    monthlyTotal : number;

}