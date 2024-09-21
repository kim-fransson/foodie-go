<script setup>
import { useDrawerStore } from '@/stores/drawer';
import { useShoppingCartStore } from '@/stores/shopping-cart';
import ShoppingCartIcon from './icons/basic/ShoppingCartIcon.vue';
import ShoppingCart from './drawer/ShoppingCart.vue';

const drawer = useDrawerStore();
const shoppingCart = useShoppingCartStore();

</script>

<template>
    <button @click="drawer.open('Shopping Cart', ShoppingCart)" class="btn btn-circle btn-ghost">
        <div class="indicator">
            <span class="indicator-item badge badge-primary">{{ shoppingCart.getNumberOfItems }}</span>
            <span class="m-0.5">
                <ShoppingCartIcon />
            </span>
        </div>
    </button>
</template>