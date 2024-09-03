//product.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { GetProductService } from '../../data/services/get-product.service';
import { Product } from '../../data/interfaces/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() id: string = "";
  
  getProductServices = inject(GetProductService);

  product!: Product;
  isLoading:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.isLoading = true;
    this.getProductServices.getProduct(this.id).subscribe({
      next: (val: Product) => {
        console.log('Product data:', val); // Добавьте логирование
        this.product = val;
      },
      error: (err) => {
        console.error('Error loading product:', err); // Добавьте логирование
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  loadProduct22(): void {
    this.getProductServices.getProduct(this.id).subscribe(val => {
      this.product = val;
    });
  }

}
