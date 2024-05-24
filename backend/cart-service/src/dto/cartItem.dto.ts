export class CartItemDto{
    readonly productId: String;
    readonly cartId:String;
    readonly productName:String;
    readonly quantity: Number; 
    readonly price: Number;
    readonly totalPrice?: Number;
    
    toString(){
        return JSON.stringify({
            productId:this.productId,
            cartId:this.cartId,
            productName:this.productName,
            quantity:this.quantity,
            price:this.price,
            totalPrice:this.totalPrice
        }
        );
    }
}