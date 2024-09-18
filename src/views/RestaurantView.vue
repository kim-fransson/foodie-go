<script setup>
import AddressIcon from '@/components/icons/basic/AddressIcon.vue';
import DistanceIcon from '@/components/icons/basic/DistanceIcon.vue';
import PickupIcon from '@/components/icons/basic/PickupIcon.vue';
import StarFilledIcon from '@/components/icons/basic/StarFilledIcon.vue';
import { useUserSettingsStore } from '@/stores/user-settings';
import { getImagePath } from '@/utils/restaurant';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const userSettings = useUserSettingsStore()

const restaurant = ref(null)
onMounted(async () => {
    try {
        await fetch(`/api/restaurants/${route.params.id}`)
            .then((res) => res.json())
            .then((json) => restaurant.value = json.restaurant)
    } catch (error) {
        // todo
    }
})

</script>

<template>
    <main class="max-w-screen-lg w-full mx-auto h-full flex flex-col mt-4 rounded-xl bg-white p-5">
        <div v-if="restaurant">
            <figure>
                <img :src="getImagePath(restaurant.types[0], true)" :alt="`Stock image for ${restaurant.types[0]} food`"
                    class="w-full h-[200px] object-cover rounded-lg" />
            </figure>
            <div class="space-y-1 mt-4">
                <h2 class="text-2xl font-semibold capitalize">{{ restaurant.name }}</h2>
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

                    <span v-if="userSettings.orderFulfillment === 'PICKUP'" class="flex gap-1 items-center text-sm">
                        <AddressIcon class="h-4 w-4" />
                        {{ restaurant.address }}
                    </span>

                    <span v-else class="flex gap-1 items-center text-sm">
                        <PickupIcon class="text-primary h-4 w-4" />
                        <span v-if="restaurant.deliveryFee !== '0.0'">{{ `$ ${restaurant.deliveryFee}`
                            }}</span>
                        <span v-else class="text-primary">Free</span>
                    </span>
                </div>
            </div>
        </div>
    </main>
</template>