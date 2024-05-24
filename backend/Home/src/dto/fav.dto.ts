// dto/add-to-fav.dto.ts
export class AddToFavItemDto {
  readonly productId: number;
  readonly name: string;
  readonly image: string;
  readonly price: number;

  constructor(productId: number, name: string, image: string, price: number) {
    this.productId = productId;
    this.name = name;
    this.image = image;
    this.price = price;
  }

  toString() {
    return JSON.stringify({
      productId: this.productId,
      name: this.name,
      image: this.image,
      price: this.price,
    });
  }
}

export class AddToFavDto {
  readonly userId: string;
  readonly items: AddToFavItemDto[];

  constructor(userId: string, items: AddToFavItemDto[]) {
    this.userId = userId;
    this.items = items;
  }

  toString() {
    return JSON.stringify({
      userId: this.userId,
      items: this.items.map(item => item.toString()),
    });
  }
}
