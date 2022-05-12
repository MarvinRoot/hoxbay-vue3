<template>
    <Header />
    <section class="products-container main-wrapper">
        <ProductList />
    </section>
</template>

<script setup>
import ProductList from '../components/ProductList.vue'
import { watch } from '@vue/runtime-core'
import Header from '../components/Header.vue'
import { store } from '../components/store'

watch(async function fetchProducts() {
    await fetch('http://localhost:3001/products').then(resp => resp.json())
    .then(productsFromServer => store.products = productsFromServer)
})
</script>