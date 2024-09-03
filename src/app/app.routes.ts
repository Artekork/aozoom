import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LayoutComponent } from './common/layout/layout.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
  { path: "", component: LayoutComponent, children: // будет рендерить страницу по лэйауту (шаблону)
    [
      {path: "", component: IndexComponent},
      {path: "product/:id", component: ProductComponent},
      {path: "product", redirectTo: ""},
      {path: "products", loadComponent: () => import("../app/pages/products/products.component").then((c) => c.ProductsComponent)}, // lazy load для оптиимзации приложения
    ]
  },
  //{ path: 'profile', component: LayoutComponent} // можно использовать без лэйаута(макета) когда не нужно рендерить хедер и футер
];
