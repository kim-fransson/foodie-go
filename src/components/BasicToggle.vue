<script setup>

defineProps(['label'])
const model = defineModel()

</script>

<template>
    <label class="label cursor-pointer">
        <span class="label-text font-medium">{{ label }}</span>
        <input v-model="model" type="checkbox" class="toggle toggle-primary toggle-sm" />
    </label>
</template>