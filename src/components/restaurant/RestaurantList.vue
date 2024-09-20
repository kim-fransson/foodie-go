<script setup>
import { computed } from 'vue';
import Fuse from 'fuse.js';

import SearchIcon from '@/components/icons/basic/SearchIcon.vue';
import RestaurantCard from './RestaurantCard.vue';

import { useRestaurantPreferences } from '@/stores/restaurant-preferences';
import { useRestaurants } from '@/stores/restaurants';

const restaurantPreferences = useRestaurantPreferences();
const restaurants = useRestaurants();

const filteredAndSortedRestaurants = computed(() => {
    let result = restaurants.items;
    if (restaurantPreferences.searchQuery) {
        const options = {
            threshold: 0.2,
            keys: ['name', 'types']
        }
        const fuse = new Fuse(result, options)
        result = fuse.search(restaurantPreferences.searchQuery).map(i => i.item)

    }


    return result.filter(r => {
        const freeDeliveryCondition = !restaurantPreferences.freeDelivery || r.deliveryFee === "0.0";
        const openNowCondition = !restaurantPreferences.openNow || r.isOpen;
        const minRatingCondition = restaurantPreferences.minRating == null || r.rating >= restaurantPreferences.minRating;
        const foodTypeCondition = !restaurantPreferences.foodType || r.types.some(t => t === restaurantPreferences.foodType);

        return freeDeliveryCondition && openNowCondition && minRatingCondition && foodTypeCondition;
    }).sort((a, b) => {
        switch (restaurantPreferences.sortBy) {
            case 'distance':
                return a.distance > b.distance
            case 'alpha_desc':
                return a.name > b.name
            case 'alpha_asc':
                return a.name < b.name
            default:
                if (a.rating !== b.rating) {
                    return b.rating - a.rating;
                }
                return b.numberOfReviews - a.numberOfReviews;
        }
    })
})

</script>

<template>
    <div v-if="filteredAndSortedRestaurants.length > 0">
        <h2 class="lg:text-2xl text-xl font-semibold">Order from {{ filteredAndSortedRestaurants.length }} places</h2>

        <ol class="grid lg:gap-8 gap-4 mt-4">
            <li v-for="restaurant in filteredAndSortedRestaurants" :key="restaurant.id">
                <RouterLink :to="`/restaurants/${restaurant.id}`">
                    <RestaurantCard :restaurant />
                </RouterLink>
            </li>
        </ol>
    </div>

    <div v-if="filteredAndSortedRestaurants.length === 0 && restaurantPreferences.searchQuery"
        class="flex flex-col items-center gap-4 mt-16">
        <SearchIcon class="size-24" />
        <h2 class="text-2xl font-semibold">{{ `We didn’t find a match for "${restaurantPreferences.searchQuery}"` }}
        </h2>
        <p>Try searching for something else instead</p>
        <button @click="restaurantPreferences.searchQuery = ''" class="btn btn-primary">Reset search</button>
    </div>


    <div v-if="restaurants.loading" class="flex justify-center mt-16">
        <span class="loading loading-dots loading-lg"></span>
    </div>

    <div v-if="filteredAndSortedRestaurants.length === 0 && !restaurants.loading"
        class="flex flex-col items-center gap-4 mt-16">
        <h2 class="text-2xl font-semibold">Uh-oh! No restaurants matched your cravings</h2>
        <p>How about tweaking your taste?</p>
    </div>
</template>
