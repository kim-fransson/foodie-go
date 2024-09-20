<script setup>

defineProps(['label'])
const model = defineModel()

</script>

<template>
    <label class="label cursor-pointer">
        <span class="label-text font-medium lg:text-base text-lg">{{ label }}</span>
        <input v-model="model" type="checkbox" class="toggle toggle-primary lg:toggle-sm" />
    </label>
</template>