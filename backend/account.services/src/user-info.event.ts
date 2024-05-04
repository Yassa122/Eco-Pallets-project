export class GetUserRequestEvent{
    constructor(public readonly userId:string, 
        public readonly name:string,
        public readonly email:string,
        public readonly shippingAddresses:string,
        public readonly phoneNumber: string){
 }
}