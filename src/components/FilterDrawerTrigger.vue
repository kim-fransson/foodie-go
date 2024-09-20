<script setup>
import { useDrawerStore } from '@/stores/drawer';
import FilterIcon from './icons/basic/FilterIcon.vue';
import RestaurantFilters from './RestaurantFilters.vue';

const drawer = useDrawerStore();

</script>

<template>
    <label @click="drawer.open('Filter', RestaurantFilters)" class="btn btn-circle btn-sm drawer-button">
        <FilterIcon />
    </label>
</template>