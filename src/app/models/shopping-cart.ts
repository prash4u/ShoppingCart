import { Product } from 'src/app/models/product';
import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart {
     items: ShoppingCartItem[]=[];


    constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {
        this.itemsMap = itemsMap || {};
                
        // tslint:disable-next-line:forin prefer-const
        for (let productId in itemsMap) {

         //   console.log("productId in shopping-cart.ts- " + productId);
            // tslint:disable-next-line:prefer-const
            let item = itemsMap[productId];
            console.log("item in shopping-cart.ts- " + item.product.price);
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    getQuantity(product: Product) {        
        let item = this.itemsMap[product.key];
        console.log("item in product-card.ts"+item);
        return item ? item.quantity :0;
      }

    get totalItemsCount(): number {
        let count = 0;
        // tslint:disable-next-line:forin prefer-const
        for ( let productId in this.itemsMap) {          
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }

    get totalPrice(): number {
        let sum = 0;
        // tslint:disable-next-line:forin prefer-const
        for ( let productId in this.items) { 
            sum += this.items[productId].totalPrice;
        }
        return sum;

    }
}