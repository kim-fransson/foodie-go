<script setup>
import { useDrawerStore } from '@/stores/drawer';
import FilterIcon from './icons/basic/FilterIcon.vue';
import RestaurantFilters from './drawer/RestaurantFilters.vue';

const drawer = useDrawerStore();

</script>

<template>
    <button @click="drawer.open('Filter', RestaurantFilters)" class="btn btn-circle btn-sm drawer-button">
        <FilterIcon />
    </button>
</template>