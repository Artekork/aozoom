import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  customers = [
    {
      route:"/product/h-001",
      text:"Каталог продукции",
    },
    {
      route:"/product/h-002",
      text:"О магазине",
    },
    {
      route:"/product/h-003",
      text:"Способы оплаты и доставки",
    },
    {
      route:"/product/h-004",
      text:"Пользовательское соглашение",
    },
    {
      route:"/product/h-005",
      text:"Политика обработки <br>персональных данных",
    },
  ];

  products = [
    {
      route:"/product/h-001",
      text:"Светодиодные линзы",
    },
    {
      route:"/product/h-002",
      text:"Светодиодные модули <br>дальнего света",
    },
    {
      route:"/product/h-003",
      text:"Переходные рамки для линз",
    },
    {
      route:"/product/h-004",
      text:"Герметик и клей для фар",
    },
    {
      route:"/product/h-005",
      text:"Маски и бленды для линз",
    },
  ]
}
