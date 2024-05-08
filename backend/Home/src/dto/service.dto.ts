// create-listing.dto.ts
export class CreateListingDto {
    readonly name: string;
    readonly image: string;
    readonly price: number;
  
    constructor(name: string, image: string, price: number) {
      this.name = name;
      this.image = image;
      this.price = price;
    }
  
    toString() {
      return JSON.stringify({
        name: this.name,
        image: this.image,
        price: this.price,
      });
    }
  }
  