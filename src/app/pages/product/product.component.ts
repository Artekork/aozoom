//product.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
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

  product = signal<Product | null>(null);
  isLoading:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.isLoading = true;
    this.getProductServices.getProduct(this.id).subscribe( val => {
      this.product.set(val); 
    });
  }

}
