<script setup>
import { ref, useTemplateRef, watchEffect } from 'vue';
import LocalizationIcon from './icons/basic/LocalizationIcon.vue';
import { useGeolocation } from '@vueuse/core';

const { coords } = useGeolocation()

const loading = ref(false)
const location = ref()
const buttonRef = useTemplateRef('button-ref');

// todo:
//      * Debouncing or invalidate stale request
//      * Store location for the session
//      * Don't make request if we can fetch location from session
async function getLocation(latitude, longitude) {
    loading.value = true;
    try {
        let data = undefined
        // const res = await fetch(`/api/location?latitude=${latitude}&longitude=${longitude}`);
        // const data = (await res.json());
        if (data.road) {
            location.value = data.road;
        } else {
            location.value = data.address;
        }
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

function handleButtonClick() {
    buttonRef.value.focus();
    buttonRef.value.blur();
}

</script>

<template>
    <div class="dropdown">
        <div ref="button-ref" tabindex="0" role="button" class="flex gap-2">
            <LocalizationIcon />
            <span v-if="loading" class="loading loading-bars loading-xs"></span>
            <span v-else>{{ location ? location : "We could not find your location" }}</span>
        </div>

        <div v-if="!location" tabindex="0" class="card dropdown-content bg-white rounded-box z-[1] w-96 shadow-lg">
            <div tabindex="0" class="card-body">
                <h2 class="card-title">How to enable location access on your browser</h2>
                <p class="font-medium">On your browser</p>
                <ol class="list-decimal list-inside">
                    <li>Locate the padlock or location icon near the left of the address bar.</li>
                    <li>Click on it to view site settings or permissions.</li>
                    <li>Find the option related to Location access and modify it:
                        <ul class="list-disc list-inside pl-4">
                            <li>If location is blocked, set it to "Allow" or "Ask."</li>
                            <li>If the option is set to "Blocked Temporarily," remove the block.</li>
                        </ul>
                    </li>
                    <li>Reload the page.</li>
                    <li>When prompted for your location access again, click Allow.</li>
                </ol>
                <button @click="handleButtonClick()" class="btn btn-primary btn-block">I understand</button>
            </div>
        </div>
    </div>
</template>