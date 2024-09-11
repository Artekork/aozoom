//product-card.component.ts
import { Component, Input, input } from '@angular/core';
import { Product } from '../../../data/interfaces/product';
import { ImageUrlPipe } from "../../../data/helpers/pipes/image-product-url.pipe";
import { NoticeService } from '../../../data/services/notice.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ImageUrlPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product 

  constructor(private noticeService: NoticeService) {}

  isFavorite: boolean = false;
  isCart: boolean = false;

  toggleFavorite(event: Event): void {
    event.preventDefault();  
    event.stopPropagation(); 
    this.isFavorite = !this.isFavorite;

    this.isFavorite == true 
    ? this.noticeService.createToast('success', 'Товар добавлен в избранное!') 
    : this.noticeService.createToast('success', 'Товар удалён из избранного!');
    
  }
  toggleCart(event: Event): void {
    event.preventDefault();  
    event.stopPropagation(); 
    this.isCart = !this.isCart;

    this.isCart == true 
    ? this.noticeService.createToast('success', 'Товар добавлен в корзину!') 
    : this.noticeService.createToast('success', 'Товар удалён из корзины!');

  }
}
