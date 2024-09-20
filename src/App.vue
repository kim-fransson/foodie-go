<script setup>
import NavigationMenu from './components/NavigationMenu.vue';
import { useRestaurants } from './stores/restaurants';

const restaurants = useRestaurants();
restaurants.registerRestaurants();

</script>

<template>
  <div class="grid grid-rows-[auto_1fr] min-h-screen">
    <NavigationMenu />
    <RouterView />
  </div>
</template>
