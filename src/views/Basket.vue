<template>
    <Header/>
    <h1 v-if="store.basket === []">Loading</h1>
    <section v-else class="basket-container">
        <h2>Your basket</h2>
        <p v-if="store.basket.length === 0">Your basket is empty</p>
        <ul v-else>
            <li v-for="(product, productIndex) in store.basket" :key="productIndex">
                <article class="basket-container__item">
                    <img :src="`${product.image}`" :alt="`${product.title}`" width="90">
                    <p>{{product.title}}</p>
                    <p>Qty:
                        <select 
                        :defaultValue="`${Number(product.quantity)}`"
                        v-model="qty"
                        @change="updateQuantity(product, Number(qty))">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </p>
                    <p>Item total: £{{(product.price * product.quantity).toFixed(2)}}</p>
                </article>
            </li>
        </ul>
        <h3>Your total: £{{getTotalCost(store.basket)}}</h3>
    </section>
</template>

<script setup>
import { watch } from '@vue/runtime-core'
import Header from '../components/Header.vue'
import { store } from '../components/store'

watch(function fetchBasket() {
    fetch('http://localhost:3001/basket').then(resp => resp.json())
    .then(basketFromServer => store.basket = basketFromServer)
})

function changeQuantity(item) {
    fetch(`http://localhost:3001/basket/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
    }).then(resp => resp.json())
}

function deleteProduct(id) {
        fetch(`http://localhost:3001/basket/${id}`, {
            method: 'DELETE'
        }).then(resp => resp.json())
}

function updateQuantity(item, newQuantity) {
    let updatedBasket = JSON.parse(JSON.stringify(store.basket))
    if (newQuantity === 0){
        updatedBasket = updatedBasket.filter(target => target.id != item.id)
        deleteProduct(item.id)
    } else {
        item.quantity = newQuantity
        updatedBasket = updatedBasket.filter(target => target.id !== item.id)
        updatedBasket.push(item)
        changeQuantity(item)
    }
    store.basket = updatedBasket
}

function getTotalCost(basket) {
    let total = 0

    for (const item of basket) {
        total += item.quantity * item.price
    }

    return total.toFixed(2)
}
</script>