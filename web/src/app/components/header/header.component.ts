import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { Nav_list_categoriesComponent } from '../nav_list_categories/nav_list_categories.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('navListCategoriesContainer', { read: ViewContainerRef })
  navListCategoriesContainer!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadNavListCategoriesComponent();
  }

  loadNavListCategoriesComponent() {
    const navListCategoriesComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        Nav_list_categoriesComponent
      );
    this.navListCategoriesContainer.clear();
    const navListCategoriesComponentRef =
      this.navListCategoriesContainer.createComponent(
        navListCategoriesComponentFactory
      );
  }
}
