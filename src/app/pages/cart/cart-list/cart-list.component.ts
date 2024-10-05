import { Component, inject, Input } from '@angular/core';
import { NgClass } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { CartProductCardComponent } from "../../../common/components/cart-product-card/cart-product-card.component";
import { CartService } from '../../../data/services/cart.service';
import { ProductService } from '../../../data/services/product.service';
import { NoticeService } from '../../../data/services/notice.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [FormsModule, NgClass, CartProductCardComponent],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {
  cartService = inject(CartService)
  productService = inject(ProductService)
  noticeService = inject(NoticeService)

  ngOnInit(): void {
    this.cartService.loadProducts();
  }
  sortBy: 'asc' | 'desc' = 'asc'; // Инициализация направления сортировки
  sortByPrice(): void {
    this.cartService.sortProductsByPrice(this.sortBy);
    this.sortBy = this.sortBy === 'asc' ? 'desc' : 'asc';
  }
  onChangeCheckbox() {
    this.cartService.toggleAllProducts();
    this.cartService.updateAllCheckedState();
  }

  deleteSelectedProducts(): void {
    const products = this.cartService.cartProducts();
    const selectedProducts = products.filter(([, , isChecked]) => isChecked);
  
    selectedProducts.forEach(([product]) => {
      this.cartService.onProductDeleted(product.id); 
      this.productService.removeOnCart(product.id);
    });
  
    const updatedProducts = this.cartService.cartProducts();
    const selectedCount = updatedProducts.filter(([, , isChecked]) => isChecked).length; 
    this.cartService.currentProducts.set(selectedCount); 
  
    this.noticeService.createToast('success', 'Выбранные товары удалены из корзины!');
  }
  
}
