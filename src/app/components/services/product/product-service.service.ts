import { Injectable, signal } from '@angular/core';
import { IProduct } from '../../product/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private products= signal<IProduct[]>([
    {
      id: 91,
      title: "Panes",
      image: "assets/images/pollo.jpg",
      price: 10.00
    },
    {
      id: 1,
      title: "Tostadas",
      image: "assets/images/tostada.jpeg",
      price: 15.00
    },
    {
      id: 2,
      title: "Pan Tostado con atun",
      image: "assets/images/panes.jpeg",
      price: 20.00
    },
    {
      id: 3,
      title: "Tornillos con pollo",
      image: "assets/images/pasta.jpeg",
      price: 30.00
    },
    {
      id: 11,
      title: "Bowl de frutas",
      image: "assets/images/bowl.jpeg",
      price: 20.00
    },
    {
      id: 12,
      title: "Ensalda de pollo",
      image: "assets/images/salad.jpeg",
      price: 25.00
    },
    {
      id: 31,
      title: "Quesadilla de aguacate",
      image: "assets/images/quesadilla.jpeg",
      price: 25.00
    },
    {
      id: 32,
      title: "Desayuno Gourmet",
      image: "assets/images/huevo-aguacate.jpeg",
      price: 30.00
    },
    {
      id: 34,
      title: "Smoothie",
      image: "assets/images/smoothies.jpeg",
      price: 15.00
    }
  ])

  getProducts(){
    return this.products
  }

  getProductById(id:number){
    const products = this.products()
    return products.find(product => product.id === id )
  }
  constructor() { }
}
