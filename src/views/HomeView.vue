<script setup>
import DebounceSearch from '@/components/DebounceSearch.vue';
import BasicToggle from '@/components/BasicToggle.vue';
import FoodFilters from '@/components/FoodFilters.vue';
import RestaurantList from '@/components/restaurant/RestaurantList.vue';
import SortByDropdown from '@/components/SortByDropdown.vue';
import StarRatings from '@/components/StarRatings.vue';
import { useRestaurantPreferences } from '@/stores/restaurant-preferences';
import FilterDrawerTrigger from '@/components/FilterDrawerTrigger.vue';

const restaurantPreferences = useRestaurantPreferences()

</script>

<template>
    <main class="max-w-screen-lg lg:mx-auto mx-4 h-full flex flex-col overflow-hidden">
        <FoodFilters />
        <div class="rounded-xl bg-white lg:mt-8 mt-4 p-5 flex-1 grid gap-8 lg:grid-cols-[220px_1fr]">
            <div class="auto-rows-min gap-4 hidden lg:grid">
                <BasicToggle label="Open now" v-model="restaurantPreferences.openNow" />
                <BasicToggle label="Free delivery" v-model="restaurantPreferences.freeDelivery" />
                <StarRatings label="Rating" v-model="restaurantPreferences.minRating" />
            </div>

            <div class="grid grid-cols-12 gap-y-8 gap-x-4 grid-rows-[auto_1fr]">
                <DebounceSearch v-model="restaurantPreferences.searchQuery" class="lg:col-span-8 col-span-10"
                    placeholder="What you want to eat today?" />
                <SortByDropdown class="col-span-4 hidden lg:block" />

                <FilterDrawerTrigger class="lg:hidden col-span-2 justify-self-end" />

                <div class="col-span-full">
                    <RestaurantList />
                </div>
            </div>
        </div>
    </main>
</template>