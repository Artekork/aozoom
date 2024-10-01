import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LayoutComponent } from './common/layout/layout.component';
import { ProductComponent } from './pages/product/product.component';
import { TestComponent } from '../assets/test/test/test.component';
import { TestGuardComponent } from '../assets/test/test-guard/test-guard.component';
import { canActivateAuth } from './data/helpers/guards/access.guard';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: "", component: LayoutComponent, children: // будет рендерить страницу по лэйауту (шаблону)
    [
      {path: "", component: IndexComponent},
      {path: "product/:id", component: ProductComponent},
      {path: "cart", component: CartComponent},
      {path: "product", redirectTo: ""},
      {path: "test", component: TestComponent},
      {path: "test-guard", component: TestGuardComponent, canActivate: [canActivateAuth]},
      {path: "products", loadComponent: () => import("../app/pages/products/products.component").then((c) => c.ProductsComponent)}, // lazy load для оптиимзации приложения
    ]
  },
  // { path: 'profile', component: ProfileComponent} // можно использовать без лэйаута(макета) когда не нужно рендерить хедер и футер
];
