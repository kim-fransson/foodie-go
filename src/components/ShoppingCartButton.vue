<script setup>
import { computed } from 'vue';
import ShoppingCartIcon from './icons/basic/ShoppingCartIcon.vue';

import { useShoppingCartStore } from '@/stores/shopping-cart';
const shoppingCart = useShoppingCartStore()

const isEmpty = computed(() => shoppingCart.items.length === 0)

</script>

<template>
    <div class="dropdown dropdown-end dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-circle btn-ghost">
            <div class="indicator">
                <span class="indicator-item badge badge-secondary">0</span>
                <span class="m-0.5">
                    <ShoppingCartIcon />
                </span>
            </div>
        </div>
        <div v-if="isEmpty" tabindex="0" class="card dropdown-content bg-base-100 rounded-box z-[1] w-96 shadow-lg">
            <div tabindex="0" class="card-body items-center text-center">
                <ShoppingCartIcon />
                <h2 class="card-title">Your cart is empty</h2>
                <p>Add items from a restaurant or store to start a new cart</p>
                <button class="btn btn-primary btn-block">Start shopping</button>
            </div>
        </div>
    </div>
</template>