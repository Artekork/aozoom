//product-section.component.ts
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../data/interfaces/product';
import { GetProductService } from '../../../data/services/get-product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.scss'
})
export class ProductSectionComponent {
  @Input() countToShow!: number;
  @Input() sectionTittle!: string;
  @Input() className?: string;
  @Input() filter?: any;
  @Input() buttonLink?: string;

  getProductServices = inject(GetProductService);

  products: Product[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.getProductServices.getProducts(this.filter).subscribe(val => {
      this.products = val;
    });
  }
}
