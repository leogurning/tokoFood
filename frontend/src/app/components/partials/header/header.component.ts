import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../shared/models/User';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  /**
   * Need to import RouterLink in this partial header to make
   * the routerLink atribute in the html work 
   */
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  cartQuantity=0;
  //user!: User;

  private cartService = inject(CartService);
  private authService = inject(AuthService);

  dataCart = toSignal(this.cartService.getCartObservable());
  dataUser = toSignal(this.authService.userObservable);

  logout() {
    this.authService.logout();
  }
}
