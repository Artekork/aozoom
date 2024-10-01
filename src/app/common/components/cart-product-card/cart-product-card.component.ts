import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCounterComponent } from "../product-counter/product-counter.component";
import { ProductService } from '../../../data/services/product.service';
import { NoticeService } from '../../../data/services/notice.service';
import { Product } from '../../../data/interfaces/product';
import { ImageUrlPipe } from "../../../data/helpers/pipes/image-product-url.pipe";

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


  
  isChecked: boolean = true;
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

  deleteCart(): void { //todo добавить диалогоовое окно для подтверждения удаления

  }

  onCounterChange(newCounterValue: number): void {
    // this.counter = newCounterValue;
    // this.updateFormValue();
    // this.calcCost();
  }


 
}
