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

  currentProducts: number = 1; //todo дорабоать
  cartProductCount: number = 0; //todo дорабоать

  accountService = inject(AccountService)
  productService = inject(ProductService)


  isAllChecked: boolean = false;
  products: [Product, number][] = []


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

    this.accountService.getUserCart().subscribe(cart => {
      this.products = this.productService.getCartProducts(cart);
      console.log(this.products);
    });
     

    
  }
  
}
