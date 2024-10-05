import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCounterComponent } from "../product-counter/product-counter.component";
import { ProductService } from '../../../data/services/product.service';
import { NoticeService } from '../../../data/services/notice.service';
import { Product } from '../../../data/interfaces/product';
import { ImageUrlPipe } from "../../../data/helpers/pipes/image-product-url.pipe";
import { CartService } from '../../../data/services/cart.service';

@Component({
  selector: 'app-cart-product-card',
  standalone: true,
  imports: [NgClass, FormsModule, ProductCounterComponent, ImageUrlPipe],
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.scss'
})
export class CartProductCardComponent {
  @Input() product!: Product; 
  @Input() productCount!: number; 
  @Output() productDeleted: EventEmitter<string> = new EventEmitter(); 
  @Input() isChecked!: boolean; // Принимаем состояние чекбокса как входное свойство

  cartService = inject(CartService)
  productService = inject(ProductService)
  noticeService = inject(NoticeService)
  isFavorite!: boolean;
  
  discount: number = 0;

  toFav(): void {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite){
      this.productService.addToFavorite(this.product.id)
      this.noticeService.createToast('error', 'Товар добавлен в избранное!') 

    } else {
      this.productService.removeOnFavorite(this.product.id)
      this.noticeService.createToast('success', 'Товар удалён из избранного!');
    }
  }

  ngOnInit(): void {
    this.isFavorite = this.productService.isFavorite(this.product.id);
    this.discount = this.productService.calcDiscount(this.product.oldPrice, this.product.price)
  }

  deleteCard(): void {
    this.productService.removeOnCart(this.product.id);
    this.noticeService.createToast('success', 'Товар удалён из корзины!');
    this.productDeleted.emit(this.product.id);
  
    // Обновляем состояние активных товаров
    const products = this.cartService.cartProducts();
    const selectedCount = products.filter(([, , isChecked]) => isChecked).length;
    this.cartService.currentProducts.set(selectedCount); // Обновляем текущее количество активных товаров
  }

 

  onCounterChange(newCounterValue: number): void {
    this.cartService.patchProducts(this.product, newCounterValue);
    this.productCount = newCounterValue;

    // Обновляем состояние чекбокса и счетчик выбранных товаров
    if (newCounterValue === 0) {
        this.isChecked = false;
    } else {
        this.isChecked = true;
    }

    // Обновляем счетчик выбранных товаров
    const products = this.cartService.cartProducts();
    const selectedCount = products.filter(([, , isChecked]) => isChecked).length;
    this.cartService.currentProducts.set(selectedCount); // Обновляем текущее количество выбранных товаров
  }
  onChangeCheckbox() {
    this.cartService.toggleProduct(this.product);
    this.isChecked = !this.isChecked; // Меняем состояние чекбокса
    
    // Обновляем состояние главного чекбокса
    this.cartService.updateAllCheckedState();
  }

}
