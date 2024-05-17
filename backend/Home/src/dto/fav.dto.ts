export class AddToFavDto {
  readonly name: string;
  readonly image: string;
  readonly price: number;
  readonly productId: number;

  constructor(name: string, image: string, price: number, productId: number) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.productId = productId;
  }

  toString() {
    return JSON.stringify({
      name: this.name,
      image: this.image,
      price: this.price,
      productId: this.productId,
    });
  }
}
