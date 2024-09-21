<script setup>
import { useShoppingCartStore } from '@/stores/shopping-cart';
import { getImagePath } from '@/utils/dish';

import MinusIcon from '@/components/icons/basic/MinusIcon.vue';
import AddIcon from '@/components/icons/basic/AddIcon.vue';
import { computed } from 'vue';


const props = defineProps(['dish', 'restaurant'])

const shoppingCart = useShoppingCartStore()

const count = computed(() => shoppingCart.getItemCountById(props.dish.id))

</script>

<template>
    <div class="card card-compact bg-base-100 shadow-xl">
        <figure>
            <img :src="getImagePath(dish.title)" :alt="`Stock image for ${dish.title} food`" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ dish.title }}</h2>
            <p>$ {{ dish.price }}</p>
            <p class="opacity-60">{{ dish.description }}</p>

            <div class="card-actions justify-end">
                <div class="join">
                    <button v-if="count !== 0" @click="shoppingCart.removeItem(dish.id)"
                        class="btn btn-sm btn-neutral join-item rounded-l-full">
                        <MinusIcon />
                    </button>
                    <input v-if="count !== 0" type="number" min="0" max="9" :value="count"
                        @change="(e) => shoppingCart.addItem(restaurant.id, dish, +e.target.value)" class="outline-none 
                                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral max-w-8 
                                    bg-neutral text-neutral-content text-center" />
                    <button @click="shoppingCart.addItem(restaurant.id, dish)"
                        :class="`btn btn-sm btn-neutral join-item ${count === 0 ? 'rounded-full' : 'rounded-r-full'}`">
                        <AddIcon />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>