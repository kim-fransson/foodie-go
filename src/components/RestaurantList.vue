<script setup>
import { computed, onMounted, ref } from 'vue';
import StarFilledIcon from './icons/basic/StarFilledIcon.vue';
import DistanceIcon from './icons/basic/DistanceIcon.vue';
import AddressIcon from './icons/basic/AddressIcon.vue';
import PickupIcon from './icons/basic/PickupIcon.vue';
import { useUserSettingsStore } from '@/stores/user-settings';
import { useRestaurantPreferences } from '@/stores/restaurant-preferences';

const userSettings = useUserSettingsStore();
const restaurantPreferences = useRestaurantPreferences();


const restaurants = ref([])
onMounted(async () => {
    try {
        await fetch('/api/restaurants')
            .then((res) => res.json())
            .then((json) => restaurants.value = json.restaurants)
    } catch (error) {
        // todo
    }
})

const filteredAndSortedRestaurants = computed(() => {
    return restaurants.value.filter(r => {
        const freeDeliveryCondition = !restaurantPreferences.freeDelivery || r.deliveryFee === "0.0";
        const openNowCondition = !restaurantPreferences.openNow || r.isOpen;
        const minRatingCondition = restaurantPreferences.minRating == null || r.rating >= restaurantPreferences.minRating;
        const foodTypeCondition = !restaurantPreferences.foodType || r.types.some(t => t === restaurantPreferences.foodType);

        return freeDeliveryCondition && openNowCondition && minRatingCondition && foodTypeCondition;
    }).sort((a, b) => {
        switch (restaurantPreferences.sortBy) {
            case 'distance':
                return a.distance > b.distance
            case 'alpha_desc':
                return a.name > b.name
            case 'alpha_asc':
                return a.name < b.name
            default:
                if (a.rating !== b.rating) {
                    return b.rating - a.rating;
                }
                return b.numberOfReviews - a.numberOfReviews;
        }
    })
})

function getImagePath(type) {
    const formattedType = type.split(' ').join('-').toLowerCase() + '.jpg';
    const imageImports = import.meta.glob('@/assets/images/*.jpg')
    const imageImport = imageImports[`/src/assets/images/${formattedType}`];

    return imageImport.name;
}

</script>

<template>
    <div>
        <h2 class="text-2xl font-semibold">Order from {{ filteredAndSortedRestaurants.length }} places</h2>

        <ol class="grid gap-8 mt-4">
            <li v-for="restaurant in filteredAndSortedRestaurants" :key="restaurant.id">
                <div class="card lg:card-side bg-base-100 shadow-xl gap-4">
                    <figure>
                        <img :src="getImagePath(restaurant.types[0])"
                            :alt="`Stock image for ${restaurant.types[0]} food`"
                            class="w-[185px] h-[120px] object-cover rounded-r-lg" />
                    </figure>
                    <div class="card-body p-0 justify-center">
                        <h2 class="card-title capitalize">{{ restaurant.name }}</h2>
                        <span class="capitalize">{{ restaurant.types.join(', ') }}</span>
                        <div class="flex gap-2 items-center">

                            <span class="flex gap-1 items-center text-sm">
                                <StarFilledIcon class="h-4 w-4" />
                                {{ restaurant.rating + ` (${restaurant.numberOfReviews}+)` }}
                            </span>

                            &bull;

                            <span class="flex gap-1 items-center text-sm">
                                <DistanceIcon class="h-4 w-4" />
                                {{ `${restaurant.distance} km` }}
                            </span>

                            &bull;

                            <span v-if="userSettings.orderFulfillment === 'PICKUP'"
                                class="flex gap-1 items-center text-sm">
                                <AddressIcon class="h-4 w-4" />
                                {{ restaurant.address }}
                            </span>

                            <span v-else class="flex gap-1 items-center text-sm">
                                <PickupIcon class="text-primary h-4 w-4" />
                                <span v-if="restaurant.deliveryFee !== 0">{{ `$ ${restaurant.deliveryFee}` }}</span>
                                <span v-else class="text-primary">Free</span>
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        </ol>
    </div>
</template>
