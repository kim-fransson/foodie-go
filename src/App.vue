<script setup>
import NavigationMenu from './components/NavigationMenu.vue';

</script>

<template>
  <div class="grid grid-rows-[auto_1fr] min-h-screen">
    <NavigationMenu />
    <RouterView />
  </div>
</template>
