import { createWebHistory, createRouter } from 'vue-router'
import Products from '../views/Products.vue'
import Categories from '../views/Categories.vue'
import Basket from '../views/Basket.vue'
import CategoryProducts from '../views/CategoryProducts.vue'
import ProductDetails from '../views/ProductDetails.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/products',
        name: 'products',
        component: Products
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories
    },
    {
        path: '/categories/:categoryId',
        name: 'category',
        component: CategoryProducts,
        props: route => ({...route.params, id: parseInt(route.params.categoryId)})
    },
    {
        path: '/products/:productId',
        name: 'product',
        component: ProductDetails,
        props: route => ({...route.params, id: parseInt(route.params.productId)})
    },
    {
        path: '/basket',
        name: 'basket',
        component: Basket
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});
  
export default router;