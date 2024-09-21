<script setup>
import { computed, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useRestaurantPreferences } from '@/stores/restaurant-preferences';
import { closeDropdown } from '@/utils/daisy-ui';

const restaurantPreferences = useRestaurantPreferences();
const selectedSortBy = ref(restaurantPreferences.sortBy);

const dropdown = ref(null);

const sortByItems = [
    { value: 'recommended', text: 'Recommended' },
    { value: 'alpha_desc', text: 'Alphabetical order (A-Z)' },
    { value: 'alpha_asc', text: 'Alphabetical order (Z-A)' },
    { value: 'distance', text: 'Distance' },
]

onClickOutside(dropdown, () => {
    selectedSortBy.value = restaurantPreferences.sortBy;
    closeDropdown(dropdown)
});

function cancel() {
    selectedSortBy.value = restaurantPreferences.sortBy;
    closeDropdown(dropdown);
}

function applySortBy() {
    restaurantPreferences.sortBy = selectedSortBy.value;
    closeDropdown(dropdown)
}

const selectedText = computed(() => sortByItems.find(i => i.value === restaurantPreferences.sortBy).text)

</script>

<template>
    <details ref="dropdown" class="dropdown dropdown-end self-start">
        <summary class="select select-primary lg:select-sm w-full flex items-center lg:text-base text-lg">{{
            selectedText }}</summary>
        <div tabindex="0" class="card mt-2 dropdown-content bg-white rounded-box z-[1] lg:w-fit w-full shadow-lg">
            <div tabindex="0" class="card-body">
                <h2 class="card-title">Sort by</h2>
                <fieldset>
                    <div v-for="sortBy in sortByItems" :key="sortBy.value">
                        <label class="label cursor-pointer justify-start gap-3">
                            <input type="radio" :id="sortBy.value" name="sort_by" :value="sortBy.value"
                                v-model="selectedSortBy" class="radio radio-xs radio-primary" />
                            <span class="label-text font-medium whitespace-nowrap">{{ sortBy.text }}</span>
                        </label>
                        <div class="divider my-0.5"></div>
                    </div>
                </fieldset>
                <div class="card-actions justify-end">
                    <button @click="cancel()" class="btn btn-ghost">Cancel</button>
                    <button @click="applySortBy()" class="btn btn-primary">Apply</button>
                </div>
            </div>
        </div>
    </details>
</template>