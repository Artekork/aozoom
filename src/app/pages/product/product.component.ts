//product.component.ts
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, Input, PLATFORM_ID, signal, SimpleChanges } from '@angular/core';
import { GetProductService } from '../../data/services/get-product.service';
import { Product } from '../../data/interfaces/product';
import { ImageUrlPipe } from "../../data/helpers/pipes/image-product-url.pipe";

import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import {Swiper} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import styles bundle
import 'swiper/css/bundle';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ImageUrlPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() id: string = "";
  
  getProductServices = inject(GetProductService);

  product = signal<Product | null>(null);


  swiper!: Swiper;
  swiper2!: Swiper;


  ngAfterViewInit(): void {
    this.swiper = new Swiper(".mySwiper", {
      modules: [Navigation, Pagination, Thumbs],
      loop: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    this.swiper2 = new Swiper(".mySwiper2", {
      modules: [Navigation, Pagination, Thumbs],
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: this.swiper, 
      },
    });
  }

  
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.getProductServices.getProduct(this.id).subscribe( val => {
      this.product.set(val); 
    });
  }



}
