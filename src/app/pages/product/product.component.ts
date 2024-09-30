//product.component.ts
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, Input, PLATFORM_ID, signal, SimpleChanges } from '@angular/core';
import { GetProductService } from '../../data/services/get-product.service';
import { Product } from '../../data/interfaces/product';
import { ImageUrlPipe } from "../../data/helpers/pipes/image-product-url.pipe";
import { ChangeDetectorRef } from '@angular/core';


import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import {Swiper} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import styles bundle
import 'swiper/css/bundle';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../data/services/account.service';
import { NoticeService } from '../../data/services/notice.service';
import { ProductService } from '../../data/services/product.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ImageUrlPipe, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() id: string = "";
  swiper!: Swiper;
  swiper2!: Swiper;
  getProductServices = inject(GetProductService);
  accountService = inject(AccountService);
  productService = inject(ProductService);

  product = signal<Product | null>(null);


  discount!:number;
  isFavoriteS = signal<boolean>(false);

  counter:number = 0;
  cost:number = 0;

  stars: number[] = [0,0,0,0,0];

  formBuilder = inject(FormBuilder)

  form = this.formBuilder.group({
    count: this.formBuilder.control(this.counter, Validators.required),
  })

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private cdr: ChangeDetectorRef,
    private noticeService: NoticeService
  ) { }

  calcCost(): void {
    this.cost = Number((this.counter * this.product()!.price).toFixed(2))
  }

  isMoreThan(): boolean {
    if (Number(this.form.get('count')?.value) >= this.product()!.count) {
      return true
    }
    else {
      return false
    }
  }
  isLessThan(): boolean {
    if (Number(this.form.get('count')?.value) <= 0) {
      return true
    }
    else {
      return false
    }
  }

  onInputChange(): void{
    if (this.isMoreThan()) {
      this.counter = this.product()!.count;
    }
    else {
      this.counter = Math.round(Number(this.form.get('count')?.value)) || 0; // Обновляем counter на основе ввода
    }
    this.updateFormValue()
    this.calcCost();
  }

  increaseCounter(): void {
    if (!this.isMoreThan()) {
      this.counter++;
    }
    this.updateFormValue();
    this.calcCost();
  }

  decreaseCounter(): void {
    if (!this.isLessThan()) {
      this.counter--;
    }
    this.updateFormValue();
    this.calcCost();
  }

  updateFormValue(): void {
    this.form.patchValue({ count: Math.round(this.counter) }); // Синхронизируем значение формы с counter
  }
  
  onSubmit(): void {
    this.productService.addToCart(this.id, this.form.value.count!);
  }



  ngAfterViewInit(): void {
    
  }

  toggleFav() : void{
    this.isFavoriteS.set(!this.isFavoriteS())
    
    if (this.isFavoriteS()){
      this.productService.addToFavorite(this.id)
      this.noticeService.createToast('error', 'Товар добавлен в избранное!') 

    } else {
      this.productService.removeOnFavorite(this.id)
      this.noticeService.createToast('success', 'Товар удалён из избранного!');
    }

  }

  ngOnInit(): void {
    this.loadProduct();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.getProductServices.getProduct(this.id).subscribe( val => {

      if (isPlatformBrowser(this.platformId)) {
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

      this.product.set(val);

      this.discount = Math.round((1-(val.price/val.oldPrice))*100)
      
      for (let i = 0; i < Math.round(val.rating); i++){
        this.stars[i] = 1;
      }

      if (this.productService.isFavorite(this.id)){
        this.isFavoriteS.set(true)
      }
    });
  }
}
