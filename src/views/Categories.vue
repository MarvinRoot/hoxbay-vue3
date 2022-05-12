<template>
<Header />
    <section class="categories-container main-wrapper">
        <ul class="categories-container__list">
            <li :style="{backgroundColor: `${getRandomColor()}`}">
                <router-link to="/categories/1">electronics</router-link>
            </li>

            <li :style="{backgroundColor: `${getRandomColor()}`}">
                <router-link to="/categories/2">jewelery</router-link>
            </li>

            <li :style="{backgroundColor: `${getRandomColor()}`}">
                <router-link to="/categories/3">men's clothing</router-link>
            </li>

            <li :style="{backgroundColor: `${getRandomColor()}`}">
                <router-link to="/categories/4">women's clothing</router-link>
            </li>
        </ul>
    </section>
</template>

<script setup>
import Header from '../components/Header.vue';
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var colors = ['#88b719', '#f4ae01', '#0064d3', '#e53238', '#19b7af', '#e532e5'];
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
</script>