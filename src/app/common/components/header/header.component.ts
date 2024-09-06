//header.component.ts
import { Component, inject, Inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetProductService } from '../../../data/services/get-product.service';
import { Product } from '../../../data/interfaces/product';
import { debounceTime, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  findWord: string = "";
  isActiveSearch = signal<boolean>(false);

  products: Product[] = [];
  getProductService = inject(GetProductService)
  
  subscribers$ = this.getProductService.getProducts(this.findWord)

  filteredProducts = this.getProductService.filteredProductsS
  

  // Создаем Subject для ввода данных
  searchSubject = new Subject<string>();

  constructor() {
    // Подписываемся на изменения поисковой строки с debounceTime
    this.searchSubject
    .pipe(
      debounceTime(150)
    )
    .subscribe((searchTerm) => {
      this.getProductService.getProductsFiltered(searchTerm).subscribe(
        (res: Product[]) => {
          this.getProductService.filteredProductsS.set(res);
        }
      );
    });
  }

  // Метод, который вызывается при каждом изменении поля ввода
  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (value != "") {
      this.searchSubject.next(value) 
      this.isActiveSearch.set(true)

    }
    else {
      this.searchSubject.next("ertyuioplkjhgfdxcvbasd");
      this.isActiveSearch.set(false)
      
    }
      
  }

  cancelSearch(){
    this.findWord = '';  // Очищаем поле ввода
    this.isActiveSearch.set(false);  // Закрываем поиск
    this.getProductService.filteredProductsS.set([]);
  }
  
}
