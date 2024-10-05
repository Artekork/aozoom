import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';
import { AccountService } from './account.service';
import { OrderState } from '../interfaces/orderState';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  accountService = inject(AccountService)
  productService = inject(ProductService)


  isAllChecked: boolean = true;

  currentProducts = signal<number>(0); 
  cartProductCount = signal<number>(0); 

  cartProducts = signal<[Product, number, boolean][]>([]) //[    [{}, 1], [{}, 1],[{}, 1],[{}, 1],[{}, 1]       ]
  isLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  orderState: OrderState = {
    price: 0,
    fullPrice: 0,
    discountPrice: 0,
    discount: 0,
    quantity: 0,

    address: 'Улица пупкина',
    delivery: 'Голубями',
    payment: 'Тузом бубновым',

    products: this.cartProducts(),
  }

  constructor() {}

  

  sortProductsByPrice(order: 'asc' | 'desc'): void {
    const sortedProducts = this.cartProducts().slice().sort(([productA], [productB]) => {
      const priceA = productA.price;
      const priceB = productB.price;
  
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
  
    this.cartProducts.set(sortedProducts);
  }

  refreshOrder() {
    const products = this.cartProducts();
    this.orderState.price = 0;
    this.orderState.fullPrice = 0;
    this.orderState.quantity = 0;
  
    for (const [product, count, isActive] of products) {
      if (isActive){
        this.orderState.price += product.price * count
        this.orderState.fullPrice += product.oldPrice * count
        this.orderState.quantity += count;
      }
    }
    this.orderState.price = this.roundToTwo(this.orderState.price)
    this.orderState.fullPrice = this.roundToTwo(this.orderState.fullPrice)
    
    this.orderState.discountPrice = this.roundToTwo(this.orderState.fullPrice - this.orderState.price)
    this.orderState.discount = this.productService.calcDiscount(this.orderState.fullPrice, this.orderState.price);
    this.orderState.products = products;
  }

  loadProducts(): void {
    this.accountService.getUserCart().subscribe(cart => {
      this.cartProducts.set(this.productService.getCartProducts(cart))
      this.currentProducts.set(cart.length); 
      this.cartProductCount.set(cart.length); 

    })

    this.refreshOrder();
    this.isLoad.next(true);
  } 

  patchProducts(product: Product, count: number, activate: boolean = true) {
    const products = this.cartProducts();
    const cartItem = products.find(([p]) => p.id == product.id);
  
    if (cartItem) {
      cartItem[1] = count;
  
      if (count === 0) {
        cartItem[2] = false;
      } else if (activate) {
        cartItem[2] = true; 
      }
    } else {
      console.warn(`Product with id ${product.id} not found in cart.`);
    }
  
    this.refreshOrder();
    this.updateAllCheckedState(); 
  }

  toggleProduct(product: Product){
    const products = this.cartProducts();
    const cartItem = products.find(([p]) => p.id == product.id);

    if (cartItem) {
      cartItem[2] = !cartItem[2];
    } else {
      console.warn(`Product with id ${product.id} not found in cart.`);
    }
    this.refreshOrder(); 
  }

  toggleAllProducts() {
    const products = this.cartProducts();
    const allChecked = products.every(([, , isChecked]) => isChecked);
    const newCheckedState = !allChecked;
  
    const updatedProducts: [Product, number, boolean][] = products.map(([product, count]) => [product, count, newCheckedState]);
    this.cartProducts.set(updatedProducts); 
  
    const selectedCount = updatedProducts.filter(([, , isChecked]) => isChecked).length;
    this.currentProducts.set(selectedCount); 
  
    this.refreshOrder();
  }

  onProductDeleted(productId: string): void {
    this.cartProducts.set(this.cartProducts().filter(([product]) => product.id !== productId))
    this.cartProductCount.set(this.cartProducts().length) 
    this.currentProducts.set(this.cartProducts().length)
    this.refreshOrder();
  }

  

  updateAllCheckedState() {
    const products = this.cartProducts();
    this.isAllChecked = products.every(([, , isChecked]) => isChecked); 
    
    const selectedCount = products.filter(([, , isChecked]) => isChecked).length;
    this.currentProducts.set(selectedCount);
  }

  private roundToTwo(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}