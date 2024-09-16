<script setup>
import BasicSearch from '@/components/BasicSearch.vue';
import BasicToggle from '@/components/BasicToggle.vue';
import FoodFilters from '@/components/FoodFilters.vue';
import SortByDropdown from '@/components/SortByDropdown.vue';
import StarRatings from '@/components/StarRatings.vue';

</script>

<template>
    <main class="max-w-screen-lg mx-auto h-full flex flex-col">
        <FoodFilters />
        <div class="rounded-xl bg-white mt-8 p-5 flex-1 grid gap-8 grid-cols-8">
            <div class="col-span-2 grid auto-rows-min gap-4">
                <BasicToggle label="Open now" />
                <BasicToggle label="Free delivery" />
                <StarRatings label="Rating" />
            </div>
            <BasicSearch class="col-span-4" />
            <SortByDropdown class="col-span-2" />
        </div>
    </main>
</template>