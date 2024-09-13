<script setup>
import { ref } from 'vue';
import LocalizationIcon from './icons/basic/LocalizationIcon.vue';
// import { useGeolocation } from '@vueuse/core';

// const ERROR_TEXT = "We could not find your location";

// const { coords, error } = useGeolocation()

// const loading = ref(false)
const locationText = ref('Stortorget 13B')

// async function getLocation(latitude, longitude) {
//     loading.value = true;
//     try {
//         const res = await fetch(`
//             https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=...`);
//         const data = (await res.json());
//         const roadAddressCountry = data.results[0].formatted.split(',');
//         if (roadAddressCountry[0] === 'unnamed road') {
//             locationText.value = roadAddressCountry[1].trim();
//         } else {
//             locationText.value = roadAddressCountry[0].trim();
//         }
//     } catch (error) {
//         locationText.value = ERROR_TEXT;
//     } finally {
//         loading.value = false;
//         pause();
//     }
// }

// watchEffect(() => {
//     if (coords) {
//         const { latitude, longitude } = coords.value;
//         if (latitude !== Infinity && longitude !== Infinity) {
//             // todo: Need to create a vercel function
//             // getLocation(latitude, longitude)
//         }
//     }
// })

// watchEffect(() => {
//     if (error) {
//         locationText.value = ERROR_TEXT
//     }
// })

</script>

<template>
    <div class="flex gap-2">
        <LocalizationIcon />
        {{ locationText }}
    </div>
</template>