import { Component, Input } from '@angular/core';
import { Product } from '../../../../data/interfaces/product';
import { ImageUrlPipe } from "../../../../data/helpers/pipes/image-product-url.pipe";

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [ImageUrlPipe],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {
  @Input() product!: Product;


}
