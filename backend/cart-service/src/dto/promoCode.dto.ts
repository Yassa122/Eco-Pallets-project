export class promoCodeDto{
    readonly promoCode: String;
    readonly discountInPercent: Number;
   
    toString(){
        return JSON.stringify({
            promoCode:this.promoCode,
            discountInPercent:this.discountInPercent
        }
        );
    }
}