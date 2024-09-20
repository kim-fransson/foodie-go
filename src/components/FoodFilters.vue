<script setup>
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
import { useRestaurantPreferences } from '@/stores/restaurant-preferences';
import HorizontalCarousel from './HorizontalCarousel.vue';

const restaurantPreferences = useRestaurantPreferences();

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
</script>

<template>
    <HorizontalCarousel>
        <div v-for="filter in filters" :key="filter.value">
            <input class="appearance-none outline-none absolute peer" type="checkbox" name="food-filter"
                :true-value="filter.value" false-value="" :id="filter.value" v-model="restaurantPreferences.foodType">
            <label
                class="inline-flex flex-col items-center cursor-pointer peer-checked:bg-primary transition-colors rounded-lg p-1"
                :for="filter.value">
                <component :is="filter.icon" class="max-w-12 lg:max-w-none" />
                <span class="capitalize text-sm font-medium whitespace-nowrap">{{ filter.value }}</span>
            </label>
        </div>
    </HorizontalCarousel>
</template>