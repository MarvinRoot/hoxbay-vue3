<template>
    <p v-if="store.products.length === 0">Loading</p>

    <ul v-else class="products-container__list">
        <li v-for="(product, productId) in store.products" :key="productId">
        <router-link :to="`/products/${product.id}`">
            <article class="product-item">
                <img :src="`${product.image}`" :alt="`${product.title}`">
                <h3>{{product.title}}</h3>
            </article>
        </router-link>
        </li>
    </ul>
</template>

<script setup>
    import { store } from './store'
</script>