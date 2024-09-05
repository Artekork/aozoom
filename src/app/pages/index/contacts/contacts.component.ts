import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  informationElems = [
    {
      img: "point.png",
      bText: "г. Могилев, ул. Лазаренко 73В, 2 этаж слева",
      gText: "(ПН-ПТ с 11:00 до 19:00, СБ-ВС — выходной)",
    },
    {
      img: "phone.png",
      bText: "+375 29 134 2171, +375 29 134 2171",
      gText: "(ПН-ПТ с 11:00 до 19:00, СБ-ВС — выходной)",
    },
    {
      img: "mail.png",
      bText: "sale@lampas.by",
      gText: "Менеджер (розничный отдел)",
    },
    {
      img: "telegram.png",
      bText: "+375 29 134 2171",
      gText: "Опт. отдел (ПН-ПТ 11:00-19:00), сотрудничество и общие вопросы",
    },

  ]

}
