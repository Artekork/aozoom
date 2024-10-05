import { Component, computed, effect, inject, runInInjectionContext, signal } from '@angular/core';
import { CartService } from '../../../data/services/cart.service';

@Component({
  selector: 'app-cart-price',
  standalone: true,
  imports: [],
  templateUrl: './cart-price.component.html',
  styleUrl: './cart-price.component.scss'
})
export class CartPriceComponent {
  

  cartService = inject(CartService)

  ngOnInit(): void {
    this.cartService.isLoad.subscribe(isLoaded => {
      if (isLoaded) {
        setTimeout(() => {
          this.cartService.refreshOrder();
        }, 400);
      }
    });
  }
  
  constructor() {
  }
  openLicense(){
    alert("Открыт политика данных.");
  }
  
  getNoun(quantity: number, one: string, two: string, five: string) {
    let n = Math.abs(quantity);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

  isNan(number: any): boolean {
    return isNaN(number)
  }
}
