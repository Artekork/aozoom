import { Component, inject, Input } from '@angular/core';
import { NgClass } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { CartProductCardComponent } from "../../../common/components/cart-product-card/cart-product-card.component";
import { Product } from '../../../data/interfaces/product';
import { AccountService } from '../../../data/services/account.service';
import { ProductService } from '../../../data/services/product.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [FormsModule, NgClass, CartProductCardComponent],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {
  products: [Product, number][] = []

  currentProducts: number = this.products.length; 
  cartProductCount: number = this.products.length; 

  accountService = inject(AccountService)
  productService = inject(ProductService)


  isAllChecked: boolean = true;


  ngOnInit(): void {
    this.loadProducts();

    // setTimeout(() => {
    //   console.log(`logggging ${this.products.length}`)
    //   this.products.splice(0,1)
    //   console.log(`logggging ${this.products.length}`)

      
    //   this.cartProductCount = this.products.length;
    // }, 2000);
  }

  // Метод для обновления списка при удалении товара
  onProductDeleted(productId: string): void {
    // Фильтруем товары, исключая удалённый товар
    this.products = this.products.filter(([product]) => product.id !== productId);
    this.cartProductCount = this.products.length; // Обновляем количество товаров
    this.currentProducts = this.products.length;
  }

  loadProducts(): void {
    this.accountService.getUserCart().subscribe(cart => {
      this.products = this.productService.getCartProducts(cart);
      this.currentProducts = cart.length; 
      this.cartProductCount = cart.length; 

      console.log(`All products ${this.cartProductCount }`) 
      console.log(this.products);
    });
  }
  
}
