<script setup>
import StarFilledIcon from '@/components/icons/basic/StarFilledIcon.vue';
import DistanceIcon from '@/components/icons/basic/DistanceIcon.vue';
import AddressIcon from '@/components/icons/basic/AddressIcon.vue';
import PickupIcon from '@/components/icons/basic/PickupIcon.vue';

import { useUserSettingsStore } from '@/stores/user-settings';

import { getImagePath } from '@/utils/restaurant';

defineProps(['restaurant'])

const userSettings = useUserSettingsStore()

</script>

<template>
    <div class="card card-compact lg:card-side bg-base-100 shadow-xl">
        <figure class="lg:max-w-56">
            <img class="h-full object-cover" :src="getImagePath(restaurant.types[0])"
                :alt="`Stock image for ${restaurant.types[0]} food`" />
        </figure>
        <div class="card-body">
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
</template>