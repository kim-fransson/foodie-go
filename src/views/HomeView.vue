<script setup>
import BasicSearch from '@/components/BasicSearch.vue';
import BasicToggle from '@/components/BasicToggle.vue';
import FoodFilters from '@/components/FoodFilters.vue';
import RestaurantList from '@/components/RestaurantList.vue';
import SortByDropdown from '@/components/SortByDropdown.vue';
import StarRatings from '@/components/StarRatings.vue';
</script>

<template>
    <main class="max-w-screen-lg mx-auto h-full flex flex-col">
        <FoodFilters />
        <div class="rounded-xl bg-white mt-8 p-5 flex-1 grid gap-8 grid-cols-[220px_1fr]">
            <div class="grid auto-rows-min gap-4">
                <BasicToggle label="Open now" />
                <BasicToggle label="Free delivery" />
                <StarRatings label="Rating" />
            </div>

            <div class="grid grid-cols-12 gap-y-8 gap-x-4 grid-rows-[auto_1fr]">
                <BasicSearch class="col-span-8" placeholder="What you want to eat today?" />
                <SortByDropdown class="col-span-4" />

                <div class="col-span-full">
                    <RestaurantList />
                </div>
            </div>
        </div>
    </main>
</template>