export class CartItemDto{
    readonly userId: String;
    readonly sessionId: String;
    readonly createdAt?: Date; 
    readonly updatedAt?: Date;
    readonly cartItems: CartItemDto[];

    toString(){
        return JSON.stringify({
            userId:this.userId,
            sessionId:this.sessionId,
            createdAt:this.createdAt,
            updatedAt:this.updatedAt,
            cartItems:this.cartItems
        }
        );
    }
}