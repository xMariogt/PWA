import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../shared/models/product.model'


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input({required: true}) product!: IProduct
  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    console.log(this.product.image)
    this.addToCart.emit(this.product)
  }
}
