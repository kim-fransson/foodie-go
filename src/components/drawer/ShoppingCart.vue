<script setup>
import { useDrawerStore } from '@/stores/drawer';
import { useShoppingCartStore } from '@/stores/shopping-cart';
import ShoppingCartIcon from '../icons/basic/ShoppingCartIcon.vue';


const shoppingCart = useShoppingCartStore();
const drawer = useDrawerStore();

</script>

<template>
    <div v-if="shoppingCart.getNumberOfItems === 0" class="flex flex-col items-center text-center gap-3 mt-36">
        <ShoppingCartIcon />
        <h2 class="card-title">Your cart is empty</h2>
        <p>Add items from a restaurant or store to start a new cart</p>
        <button @click="drawer.close()" class="btn btn-primary btn-block">Start shopping</button>
    </div>
</template>