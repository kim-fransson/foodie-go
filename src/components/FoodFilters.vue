<script setup>
import { ref, watchEffect } from 'vue';
import { useResizeObserver } from '@vueuse/core'

import AsianIcon from './icons/food/AsianIcon.vue';
import BreakfastIcon from './icons/food/BreakfastIcon.vue';
import BurgerIcon from './icons/food/BurgerIcon.vue';
import DessertIcon from './icons/food/DessertIcon.vue';
import FastFoodIcon from './icons/food/FastFoodIcon.vue';
import HealthyIcon from './icons/food/HealthyIcon.vue';
import IceCreamIcon from './icons/food/IceCreamIcon.vue';
import IndianIcon from './icons/food/IndianIcon.vue';
import ItalianIcon from './icons/food/ItalianIcon.vue';
import KoreanIcon from './icons/food/KoreanIcon.vue';
import PizzaIcon from './icons/food/PizzaIcon.vue';
import SeafoodIcon from './icons/food/SeafoodIcon.vue';
import SushiIcon from './icons/food/SushiIcon.vue';
import VeganIcon from './icons/food/VeganIcon.vue';
import ArrowIcon from './icons/basic/ArrowIcon.vue';

const TRANSLATE_AMOUNT = 200;

const filters = [
    { value: "asian", icon: AsianIcon },
    { value: "breakfast", icon: BreakfastIcon },
    { value: "burger", icon: BurgerIcon },
    { value: "dessert", icon: DessertIcon },
    { value: "fast food", icon: FastFoodIcon },
    { value: "healthy", icon: HealthyIcon },
    { value: "ice cream", icon: IceCreamIcon },
    { value: "indian", icon: IndianIcon },
    { value: "italian", icon: ItalianIcon },
    { value: "korean", icon: KoreanIcon },
    { value: "pizza", icon: PizzaIcon },
    { value: "seafood", icon: SeafoodIcon },
    { value: "sushi", icon: SushiIcon },
    { value: "vegan", icon: VeganIcon }
];

const selectedFilter = ref('')

function selectFilter(filter) {
    selectedFilter.value = selectedFilter.value === filter ? '' : filter
}

const listRef = ref(null);
const translateList = ref(0);
const isLeftButtonVisible = ref(false);
const isRightButtonVisible = ref(false);

useResizeObserver(listRef, (entries) => {
    const entry = entries[0]
    const { clientWidth, scrollWidth } = entry.target;

    isLeftButtonVisible.value = translateList.value > 0;
    isRightButtonVisible.value = translateList.value + clientWidth < scrollWidth;
})

function translateListRight() {
    const newTranslate = translateList.value + TRANSLATE_AMOUNT;
    const edge = listRef.value.scrollWidth;
    const width = listRef.value.clientWidth;
    translateList.value = newTranslate + width >= edge ? edge - width : newTranslate;
}

function translateListLeft() {
    const newTranslate = translateList.value - TRANSLATE_AMOUNT;
    translateList.value = newTranslate <= 0 ? 0 : newTranslate;
}

watchEffect(() => {
    if (listRef.value) {
        isLeftButtonVisible.value = translateList.value > 0;
        isRightButtonVisible.value = translateList.value + listRef.value.clientWidth < listRef.value.scrollWidth;
    }
})



</script>

<template>
    <div ref="listRef" class="overflow-hidden pl-8 mt-4 relative">
        <div v-if="isLeftButtonVisible" class="top-1/2 left-0 z-50 absolute -translate-y-1/2 flex items-center justify-center aspect-square h-full
            bg-gradient-to-r from-base-100 to-transparent">
            <button @click="translateListLeft" class="btn-circle btn btn-xs">
                <ArrowIcon class="rotate-180 w-5 h-5" />
            </button>
        </div>
        <fieldset :style="{ transform: `translateX(-${translateList}px)` }"
            class="flex gap-12 transition-transform duration-300">
            <div v-for="filter in filters" :key="filter.value">
                <input class="appearance-none outline-none absolute peer" type="checkbox" name="food-filter"
                    :value="filter.value" :id="filter.value" :checked="selectedFilter === filter.value"
                    @change="selectFilter(filter.value)">
                <label
                    class="inline-flex flex-col items-center cursor-pointer peer-checked:bg-primary transition-colors rounded-lg p-1"
                    :for="filter.value">
                    <component :is="filter.icon" />
                    <span class="capitalize text-sm font-medium whitespace-nowrap">{{ filter.value }}</span>
                </label>
            </div>
        </fieldset>
        <div v-if="isRightButtonVisible" class="top-1/2 right-0 z-50 absolute -translate-y-1/2 flex items-center justify-center aspect-square h-full
            bg-gradient-to-l from-base-100 to-transparent">
            <button @click="translateListRight" class="btn-circle btn btn-xs">
                <ArrowIcon class="h-5 w-5" />
            </button>
        </div>
    </div>
</template>