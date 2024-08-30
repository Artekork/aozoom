import { Component } from '@angular/core';
import { HeaderComponent } from "../../common/components/header/header.component";
import { ProductSectionComponent } from "../../common/components/product-section/product-section.component";
import { BannerAboutUsComponent } from "./banner-about-us/banner-about-us.component";
import { CooperationComponent } from "./cooperation/cooperation.component";
import { ContactsComponent } from "./contacts/contacts.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [HeaderComponent, ProductSectionComponent, BannerAboutUsComponent, CooperationComponent, ContactsComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
