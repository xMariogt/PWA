import { Component, inject, signal } from '@angular/core';
import { IProduct } from '../../shared/models/product.model';
import { ProductComponent } from '../../components/product/product.component';
import { ProductServiceService } from '../../../services/product/product-service.service';
import { CartService } from '../../../services/cart/cart.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent {

  private productsService = inject(ProductServiceService)
  private cartService = inject(CartService)

  products = signal<IProduct[]>([])

  Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })
  
  addToCart(product: IProduct){
    this.cartService.addToCart(product)
    this.Toast.fire({  // Uso del servicio SweetAlert
      title: 'Producto agregado',
      icon: 'success',
    });
  }

  ngOnInit(){
    this.products = this.productsService.getProducts()
  }
}
