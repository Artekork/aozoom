//product-card.component.ts
import { Component, inject, Input, input } from '@angular/core';
import { Product } from '../../../data/interfaces/product';
import { ImageUrlPipe } from "../../../data/helpers/pipes/image-product-url.pipe";
import { NoticeService } from '../../../data/services/notice.service';
import { AccountService } from '../../../data/services/account.service';
import { ProductService } from '../../../data/services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ImageUrlPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  accountService = inject(AccountService)
  productService = inject(ProductService);

  constructor(private noticeService: NoticeService) {}

  isFavorite: boolean = false;
  
  
  toggleFavorite(event: Event): void {
    event.preventDefault();  
    event.stopPropagation(); 
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
  }

  addCart(event: Event): void {
    event.preventDefault();  
    event.stopPropagation(); 

    if (this.productService.addToCart(this.product.id)){
      this.noticeService.createToast('success', 'Товар добавлен в корзину!') 
    }
  }
}

