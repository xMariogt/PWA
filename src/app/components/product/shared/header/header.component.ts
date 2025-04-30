import { Component, inject, signal, SimpleChanges } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive, RouterLinkWithHref, CurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hiddenSiteMenu = signal(true)
  private cartService = inject(CartService) //Aqui se encuentran las funciones relacionadas al carrito
  cart = this.cartService.cart
  total = this.cartService.calcTotal()

  Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })

  toggleSideMenu() {
    this.hiddenSiteMenu.update(prevState => !prevState)
  }

  removeFromCart(index: number) {
    this.cartService.DeleteFromCart(index)
    this.cart.update(this.cartService.cart)
    this.total = this.cartService.calcTotal()

    this.Toast.fire({
      title: 'Producto eliminado',
      icon: 'error',
    })
  }

  send() {
    if (this.total() > 0) {
      this.hiddenSiteMenu.update(prevState => !prevState)
      this.cartService.clearCart()
      this.cart.update(this.cartService.cart)
      this.total = this.cartService.calcTotal()
      Swal.fire({
        title: 'Pedido enviado',
        text: `Tu pedido ha sido enviado con éxito.\nPuedes recogerlo en 10 minutos.`,
        icon: 'success',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Agrega productos al carrito',
        icon: 'error',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      })
    }
  }

}
