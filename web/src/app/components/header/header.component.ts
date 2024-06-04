import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer2
} from '@angular/core';
import { Nav_list_categoriesComponent } from '../nav_list_categories/nav_list_categories.component';
import { UsersService } from 'src/app/services/users.service';
import { CartService } from 'src/app/services/Cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isLogin: boolean = false;
  isAdmin: boolean = false;
  userName: string | null = null;
  cartItems: any[] = [];
  totalAmount: number = 0;
  totalQuantity: number = 0;

  @ViewChild('navListCategoriesContainer', { read: ViewContainerRef })
  navListCategoriesContainer!: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private auth: UsersService,
    private cartService: CartService,
    private renderer: Renderer2
  ) {
    this.isLogin = this.auth.checkLogin();
    this.isAdmin = this.auth.checkAdmin();
  }

  ngOnInit(): void {
    const dataUser = localStorage.getItem('currentUser');
    if (dataUser) {
      const user = JSON.parse(dataUser);
      this.userName = user.user_name_us;
    }

    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
      this.totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  ngAfterViewInit(): void {
    this.loadNavListCategoriesComponent();
    this.setupMobileNavToggle();
  }

  loadNavListCategoriesComponent(): void {
    const navListCategoriesComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      Nav_list_categoriesComponent
    );
    this.navListCategoriesContainer.clear();
    this.navListCategoriesContainer.createComponent(navListCategoriesComponentFactory);
  }

  setupMobileNavToggle(): void {
    const btn = document.querySelector('.btn_nav__mobile');
    const btn_closed = document.querySelector('.btn_closed_nav_mobile');
    const nav_mobile = document.querySelector('.nav_menu__mobile') as HTMLElement;

    if (btn && nav_mobile) {
      this.renderer.listen(btn, 'click', () => {
        const transform = nav_mobile.style.transform;
        nav_mobile.style.transform = transform === 'translateX(1000px)' ? 'translateX(0)' : 'translateX(1000px)';
      });
      this.renderer.listen(btn_closed, 'click', () => {
        const transform = nav_mobile.style.transform;
        nav_mobile.style.transform = transform === 'translateX(0px)' ? 'translateX(1000px)' : 'translateX(0px)';
      });
    }
  }


  onLogout(): void {
    localStorage.clear();
    location.assign('/');
  }

  formatNumber(number: number): string {
    return number.toLocaleString('en-US');
  }
}
