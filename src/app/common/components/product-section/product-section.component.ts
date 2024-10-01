//product-section.component.ts
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../data/interfaces/product';
import { ProductService } from '../../../data/services/product.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";
import { RouterModule } from '@angular/router';
import { Stream } from 'stream';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterModule, AsyncPipe],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.scss'
})
export class ProductSectionComponent {
  @Input() countToShow!: number;
  @Input() sectionTittle!: string;
  @Input() className?: string;
  @Input() filter?: any;
  @Input() buttonLink?: string;

  productService = inject(ProductService);

  products: Product[] = [];
  
  // subscribers$ = this.productService.getProducts(this.filter); 

  constructor() { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.filter).subscribe(val => {
      this.products = val;
    });
  }
}
