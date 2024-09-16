<script setup>

defineProps(['label'])

</script>

<template>
    <label class="label cursor-pointer">
        <span class="label-text font-medium">{{ label }}</span>
        <input type="checkbox" class="toggle toggle-primary toggle-sm" />
    </label>
</template>