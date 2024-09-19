<script setup>
import { ref } from 'vue';
import ShoppingCartIcon from './icons/basic/ShoppingCartIcon.vue';
import { onClickOutside } from '@vueuse/core'
import { useShoppingCartStore } from '@/stores/shopping-cart';
import { closeDropdown } from '@/utils/daisy-ui';

const dropdown = ref(null);
const shoppingCart = useShoppingCartStore()

function startShopping() {
    closeDropdown(dropdown);
}

onClickOutside(dropdown, () => {
    closeDropdown(dropdown)
});

</script>

<template>
    <details ref="dropdown" class="dropdown dropdown-end dropdown-bottom">
        <summary class="btn btn-circle btn-ghost">
            <div class="indicator">
                <span class="indicator-item badge badge-primary">0</span>
                <span class="m-0.5">
                    <ShoppingCartIcon />
                </span>
            </div>
        </summary>
        <div v-if="shoppingCart.getNumberOfItems === 0" tabindex="0"
            class="card dropdown-content bg-white rounded-box z-[1] w-96 shadow-lg">
            <div tabindex="0" class="card-body items-center text-center">
                <ShoppingCartIcon />
                <h2 class="card-title">Your cart is empty</h2>
                <p>Add items from a restaurant or store to start a new cart</p>
                <button @click="startShopping()" class="btn btn-primary btn-block">Start shopping</button>
            </div>
        </div>
    </details>
</template>