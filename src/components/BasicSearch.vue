<script setup>
import SearchIcon from './icons/basic/SearchIcon.vue';

defineProps(['placeholder'])

</script>

<template>
    <label class="input input-primary input-sm flex items-center gap-2">
        <input :placeholder type="text" class="grow" />
        <SearchIcon class="size-4" />
    </label>
</template>