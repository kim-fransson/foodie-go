<script setup>
import { computed, ref } from 'vue';
import ShoppingCartIcon from './icons/basic/ShoppingCartIcon.vue';
import { onClickOutside } from '@vueuse/core'
import { useShoppingCartStore } from '@/stores/shopping-cart';
import { closeDropdown } from '@/utils/daisy-ui';
import MinusIcon from './icons/basic/MinusIcon.vue';
import AddIcon from './icons/basic/AddIcon.vue';

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
                <span class="indicator-item badge badge-primary">{{ shoppingCart.getNumberOfItems }}</span>
                <span class="m-0.5">
                    <ShoppingCartIcon />
                </span>
            </div>
        </summary>
        <div tabindex="0" class="card dropdown-content bg-white rounded-box z-[1] w-96 shadow-lg">
            <div v-if="shoppingCart.getNumberOfItems === 0" tabindex="0" class="card-body items-center text-center">
                <ShoppingCartIcon />
                <h2 class="card-title">Your cart is empty</h2>
                <p>Add items from a restaurant or store to start a new cart</p>
                <button @click="startShopping()" class="btn btn-primary btn-block">Start shopping</button>
            </div>

            <div v-else class="card-body gap-4">
                <div v-for="[restaurant, items] in shoppingCart.getCheckoutSummary.restaurantNameItemsMap"
                    :key="restaurant">
                    <h2 class="card-title capitalize">
                        {{ restaurant }}
                    </h2>
                    <div class="mt-3">
                        <div v-for="(item, index) in items" :key="item.id" class="flex flex-col">
                            <div class="grid grid-cols-2">
                                <p class="font-medium">{{ item.amount }} {{ item.name }}</p>
                                <span class="opacity-80 text-sm row-start-2">$ {{ item.price }}</span>

                                <div class="join justify-self-end self-center row-span-2">
                                    <button @click="shoppingCart.removeItem(item.id)"
                                        class="btn btn-xs btn-neutral join-item rounded-l-full">
                                        <MinusIcon />
                                    </button>

                                    <input type="number" min="0" max="9" :value="item.amount"
                                        @change="(e) => shoppingCart.addItem(restaurant, item, +e.target.value)" class="outline-none 
                                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral h-6 max-w-6 
                                    bg-neutral text-neutral-content text-center" />

                                    <button @click="shoppingCart.addItem(restaurant, item)"
                                        :class="`btn btn-xs btn-neutral join-item ${item.amount === 0 ? 'rounded-full' : 'rounded-r-full'}`">
                                        <AddIcon />
                                    </button>
                                </div>
                            </div>
                            <div v-if="index !== items.length - 1" class="divider my-0.5"></div>
                        </div>
                    </div>
                </div>

                <dl
                    class="grid grid-cols-2 gap-1 mt-4 [&>dt]:text-sm [&>dt]:opacity-80 [&>dd]:text-sm [&>dd]:font-semibold [&>dd]:text-right">
                    <dt>Subtotal</dt>
                    <dd>${{ shoppingCart.getCheckoutSummary.subtotal }}</dd>

                    <dt>Delivery costs</dt>
                    <dd v-if="shoppingCart.getCheckoutSummary.deliveryCost > 0">${{
                        shoppingCart.getCheckoutSummary.deliveryCost }}</dd>
                    <dd class="text-primary" v-else>Free</dd>

                    <dt>Total</dt>
                    <dd>${{ shoppingCart.getCheckoutSummary.total }}</dd>
                </dl>

                <button class="btn btn-primary btn-block">Go to checkout</button>
            </div>
        </div>
    </details>
</template>