<script setup>
import { computed, onMounted, ref } from 'vue';
import _ from 'lodash';
import { useRoute } from 'vue-router';


import HorizontalCarousel from '@/components/HorizontalCarousel.vue';
import AddressIcon from '@/components/icons/basic/AddressIcon.vue';
import DistanceIcon from '@/components/icons/basic/DistanceIcon.vue';
import InfoIcon from '@/components/icons/basic/InfoIcon.vue';
import PickupIcon from '@/components/icons/basic/PickupIcon.vue';
import StarFilledIcon from '@/components/icons/basic/StarFilledIcon.vue';
import DishCard from '@/components/dish/DishCard.vue';

import { useUserSettingsStore } from '@/stores/user-settings';

import { getImagePath } from '@/utils/restaurant';

const route = useRoute()
const userSettings = useUserSettingsStore()

const restaurant = ref(null)
onMounted(async () => {
    try {
        await fetch(`/api/restaurants/${route.params.id}`)
            .then((res) => res.json())
            .then((json) => restaurant.value = json.restaurant)
    } catch (error) {
        // todo
    }
})

const menuSections = computed(() => restaurant.value && Object.keys(restaurant.value.menu));

</script>

<template>
    <main class="max-w-screen-lg w-full mx-auto h-full flex flex-col mt-4 rounded-xl bg-white p-5">
        <div v-if="restaurant">
            <figure>
                <img :src="getImagePath(restaurant.types[0], true)" :alt="`Stock image for ${restaurant.types[0]} food`"
                    class="w-full h-[200px] object-cover rounded-lg" />
            </figure>

            <div class="flex flex-col gap-1 mt-5">
                <h2 class="text-3xl font-semibold capitalize">{{ restaurant.name }}</h2>
                <span class="capitalize">{{ restaurant.types.join(', ') }}</span>
                <div class="flex gap-2 items-center">
                    <span class="flex gap-1 items-center text-sm">
                        <StarFilledIcon class="h-4 w-4" />
                        {{ restaurant.rating + ` (${restaurant.numberOfReviews}+)` }}
                    </span>

                    &bull;

                    <span class="flex gap-1 items-center text-sm">
                        <DistanceIcon class="h-4 w-4" />
                        {{ `${restaurant.distance} km` }}
                    </span>

                    &bull;

                    <span v-if="userSettings.orderFulfillment === 'PICKUP'" class="flex gap-1 items-center text-sm">
                        <AddressIcon class="h-4 w-4" />
                        {{ restaurant.address }}
                    </span>

                    <span v-else class="flex gap-1 items-center text-sm">
                        <PickupIcon class="text-primary h-4 w-4" />
                        <span v-if="restaurant.deliveryFee !== '0.0'">{{ `$ ${restaurant.deliveryFee}`
                            }}</span>
                        <span v-else class="text-primary">Free</span>
                    </span>
                </div>
            </div>

            <HorizontalCarousel class="mt-8">
                <a class="font-medium" v-for="section in menuSections" :href="`#${section}`" :key="section">
                    {{ _.startCase(section) }}
                    <span v-if="section === 'popular'">❤️</span>
                    <span v-if="section === 'chefsPicks'">👨🏻‍🍳</span>
                </a>
            </HorizontalCarousel>

            <div class="divider"></div>

            <div class="mt-8" v-for="section in menuSections" :key="section">
                <h2 class="text-2xl font-medium" :id="section">
                    {{ _.startCase(section) }}
                    <span v-if="section === 'popular'">❤️</span>
                    <span v-if="section === 'chefsPicks'">👨🏻‍🍳</span>
                </h2>
                <span class="mt-1 text-sm opacity-60 flex items-center gap-2" v-if="section === 'lunch'">
                    <InfoIcon />
                    Please note: products in this category can only be delivered between: 12:00 - 16:00
                </span>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 mt-6 gap-5">
                    <DishCard v-for="dish in restaurant.menu[section]" :key="dish.title" :dish :restaurant />
                </div>
            </div>
        </div>
    </main>
</template>
