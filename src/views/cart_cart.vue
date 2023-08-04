<template>
    <h1 class="mt-3 text-truncate"><strong>My Cart</strong></h1>
    <table class="table">
        <thead>
            <tr>
                <th>products</th>
                <th>price</th>
                <th>quantity</th>
                <th>sum</th>
                <th>delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cart, index) in carts" :key="index">
                <td>
                    <img :src="cart.product.image" alt="" class="img-thumbnail" width="100">
                    {{ cart.product.title }}
                </td>
                <td>{{ currencyTHB(cart.product.price) }} usd</td>
                <td>
                    <button class="btn btn-sm btn-secondary" @click="cart_store.decrement_quantity(index)">-</button>
                    <span class="mx-2">{{ cart.quantity }}</span>
                    <button class="btn btn-sm btn-secondary" @click="cart_store.increment_quantity(index)">+</button>
                </td>
                <td>{{ currencyTHB(cart.total_product) }} usd</td>
                <td>
                    <button class="btn btn-danger" @click="cart_store.remove_cart(index)">delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-primary mb-5" @click="cart_store.clear_cart()">reset</button>
    <button class="btn btn-success mb-5 mx-2">sum = {{ currencyTHB(cart_store.total) }}</button>
</template>
 


<script setup>


import { computed } from 'vue'

//currencyTHB
import { currencyTHB } from '../currency/currency'

//useProductStore
import { useProductStore } from '../store/product'
const product_store = useProductStore()

//useCartStore
import { useCartStore } from '../store/cart';
const cart_store = useCartStore()

const carts = computed(() => cart_store.cart_previews)


</script>
 
<style lang="scss" scoped></style>