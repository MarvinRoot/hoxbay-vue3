<template>
    <Header />
    <h1 v-if="store.products === []">Loading</h1>
    
    <section v-else class="product-detail main-wrapper">
        <img :src="`${store.product.image}`" :alt="`${store.product.title}`">
        <div
        class="product-detail__side">
        <h2>{{store.product.title}}</h2>
        <p>{{store.product.description}}</p>
        <p>£{{store.product.price}}</p>
        <button @click="addItemToBasket()">Add to basket</button>
        </div>
    </section>
</template>

<script setup>
import { watch } from "@vue/runtime-core";
import { store } from '../components/store'
import Header from "../components/Header.vue";
import router from "../router";

const props = defineProps({
  productId: Number
})

watch(async function fetchProductData() {
    await fetch(`http://localhost:3001/products/${props.productId}`).then(resp => resp.json())
    .then(productFromServer => store.product = productFromServer)
})

    function addItemToBasket() {
        fetch('http://localhost:3001/basket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...store.product, quantity: 1 })
        }).then(resp => {
            if (resp.ok) {
                // managed to create the item
                router.push({ path: '/basket', replace: true })
            } else {
                // failed to create the item
                // probably because the item is already there
                // increase quantity on server
                // then navigate to basket
                router.push({ path: '/basket', replace: true })
            }
        }
    )}
</script>