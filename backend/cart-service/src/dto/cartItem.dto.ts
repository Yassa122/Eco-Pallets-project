export class CartItemDto{
    readonly cartId: String;
    readonly productId: String;
    readonly productName:String;
    readonly quantity: Number; 
    readonly price: Number;
    readonly totalPrice?: Number;
    
    toString(){
        return JSON.stringify({
            cartId:this.cartId,
            productId:this.productId,
            productName:this.productName,
            quantity:this.quantity,
            price:this.price,
            totalPrice:this.totalPrice
        }
        );
    }
}