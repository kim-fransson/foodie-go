<script setup>
import { ref, watchEffect } from 'vue';
import LocalizationIcon from './icons/basic/LocalizationIcon.vue';
import { useGeolocation } from '@vueuse/core';

const ERROR_TEXT = "We could not find your location";

const { coords, error } = useGeolocation()

const loading = ref(false)
const locationText = ref('')

async function getLocation(latitude, longitude) {
    loading.value = true;
    try {
        const res = await fetch(`/api/location?latitude=${latitude}&longitude=${longitude}`);
        const data = (await res.json());
        if (data.road) {
            locationText.value = data.road;
        } else {
            locationText.value = data.address;
        }
    } catch (error) {
        locationText.value = ERROR_TEXT;
    } finally {
        loading.value = false;
    }
}

watchEffect(() => {
    const { latitude, longitude } = coords.value;
    if (latitude !== Infinity && longitude !== Infinity) {
        getLocation(latitude, longitude)
    }
})

watchEffect(() => {
    if (error) {
        locationText.value = ERROR_TEXT
    }
})

</script>

<template>
    <div class="flex gap-2">
        <LocalizationIcon />
        {{ locationText }}
    </div>
</template>