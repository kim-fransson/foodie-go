<script setup>
import { useRestaurantPreferences } from '@/stores/restaurant-preferences';
import BasicToggle from '../BasicToggle.vue';
import StarRatings from '../StarRatings.vue';
import SortByDropdown from '../SortByDropdown.vue';

const restaurantPreferences = useRestaurantPreferences()


</script>

<template>
    <div class="grid gap-4">
        <SortByDropdown />
        <BasicToggle label="Open now" v-model="restaurantPreferences.openNow" />
        <BasicToggle label="Free delivery" v-model="restaurantPreferences.freeDelivery" />
        <StarRatings label="Rating" v-model="restaurantPreferences.minRating" />
    </div>
</template>