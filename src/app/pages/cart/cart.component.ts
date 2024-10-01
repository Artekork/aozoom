import { Component, inject, Input } from '@angular/core';
import { CartListComponent } from "./cart-list/cart-list.component";
import { CartPriceComponent } from "./cart-price/cart-price.component";
import { Product } from '../../data/interfaces/product';
import { AccountService } from '../../data/services/account.service';
import { ProductService } from '../../data/services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartListComponent, CartPriceComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  
  

}
