import { Product } from 'src/app/models/product';
// export interface ShoppingCartItem {
//     product: Product;
//     quantity: number;

// }


export class ShoppingCartItem {

    constructor(public product: Product, public quantity: number) {
    }

    get totalPrice() { return this.product.price * this.quantity; }
}