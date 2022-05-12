<template>
    <Header />
    <h1>
        Products for category {{props.categoryId}}
        <ProductList />
    </h1>
</template>

<script setup>
import Header from '../components/Header.vue'
import { store } from '../components/store'
import ProductList from '../components/ProductList.vue';
import { watch } from '@vue/runtime-core'

const props = defineProps({
  categoryId: Number
})
watch(async function fetchCategoryProducts() {
    await fetch(`http://localhost:3001/products?categoryId=${props.categoryId}`).then(resp => resp.json())
    .then(productsFromServer => store.products = productsFromServer)
})
</script>