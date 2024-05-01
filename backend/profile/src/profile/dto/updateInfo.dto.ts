
export class UpdateUserDto{
    readonly firstName: String;
    readonly lastName: String; 
    readonly email: String;
    readonly address: String;
    readonly contact: String;

    toString(){
        return JSON.stringify({
            
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email,
            address:this.address,
            contact:this.contact

        }
        );
    }
}

