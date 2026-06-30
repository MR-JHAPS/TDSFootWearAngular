export class FormattedClientRequest{


    constructor(
        public foomName : string = "",
        public panNumber : number | string = 0,
        public billNumber :number | string = 0,
        public formattedDate :  string = "",
        public vatTax : number | string = 0,
        public amount : number | string = 0,
        public total : number | string = 0
    ){}


    


}