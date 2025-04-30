import { Routes } from '@angular/router';
import { ProductlistComponent } from './components/product/pages/productlist/productlist.component';
import { LayoutComponent } from './components/product/shared/layout/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{
            path: "",
            component: ProductlistComponent
        }]
    }
];
