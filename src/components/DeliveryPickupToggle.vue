<script setup>
import { useUserSettingsStore } from '@/stores/user-settings';
import DeliveryIcon from './icons/basic/DeliveryIcon.vue';
import PickupIcon from './icons/basic/PickupIcon.vue';

defineProps(['id'])

const store = useUserSettingsStore();

const orderTypes = [
    { value: 'DELIVERY', icon: DeliveryIcon },
    { value: 'PICKUP', icon: PickupIcon },
]

</script>

<template>
    <fieldset class="rounded-full bg-base-200 flex p-1 gap-2">
        <div v-for="orderType in orderTypes" :key="orderType.value" class="w-full">
            <input type="radio" :id="orderType.value" :name="`${id}-order_type`" v-model="store.orderFulfillment"
                class="appearance-none outline-none absolute peer" :value="orderType.value" />

            <label :for="orderType.value" class="flex justify-center gap-1 peer-focus-visible:outline peer-focus-visible:outline-2
                peer-checked:text-primary peer-checked:bg-white rounded-full px-1.5 py-1 cursor-pointer select-none">
                <component :is="orderType.icon" />
                <span class="text-neutral capitalize">{{ orderType.value.toLowerCase() }}</span>
            </label>
        </div>
    </fieldset>
</template>
