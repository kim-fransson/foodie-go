<script setup>
import { onMounted, ref } from 'vue';
import NavigationMenu from './components/NavigationMenu.vue';
import { useDrawerStore } from './stores/drawer';
import { useRestaurants } from './stores/restaurants';
import BackButtonIcon from './components/icons/basic/BackButtonIcon.vue';

const restaurants = useRestaurants();
restaurants.registerRestaurants();

const drawerStore = useDrawerStore();
const drawer = ref(null)

onMounted(() => {
  drawerStore.registerDrawer(drawer)
})

</script>

<template>
  <div ref="drawer" class="drawer drawer-end">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="grid grid-rows-[auto_1fr] min-h-screen overflow-x-hidden">
        <NavigationMenu />
        <RouterView />
      </div>
    </div>
    <div class="drawer-side z-50">
      <ul class="bg-white text-base-content min-h-full w-screen p-4">
        <header class="flex items-center gap-4">
          <button @click="drawerStore.close()" class="btn btn-ghost btn-circle">
            <BackButtonIcon class="size-10" />
          </button>

          <h2 class="text-2xl font-semibold">{{ drawerStore.title }}</h2>
        </header>

        <component class="mt-4" :is="drawerStore.content"></component>
      </ul>
    </div>
  </div>
</template>
