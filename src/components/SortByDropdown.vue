<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'

const dropdown = ref(null);

function closeDropdown() {
    dropdown.value.removeAttribute('open');
}

onClickOutside(dropdown, () => {
    closeDropdown()
});

const sortByItems = [
    { value: 'recommended', text: 'Recommended' },
    { value: 'alpha_desc', text: 'Alphabetical order (A-Z)' },
    { value: 'alpha_asc', text: 'Alphabetical order (Z-A)' },
    { value: 'distance', text: 'Distance' },
]

const selected = ref(sortByItems[0]);

function applySortBy() {
    closeDropdown()
}

</script>

<template>
    <details ref="dropdown" class="dropdown dropdown-end self-start">
        <summary class="select select-primary select-sm w-full">{{ selected.text }}</summary>
        <div tabindex="0" class="card mt-2 dropdown-content bg-white rounded-box z-[1] w-fit shadow-lg">
            <div tabindex="0" class="card-body">
                <h2 class="card-title">Sort by</h2>
                <fieldset>
                    <div v-for="sortBy in sortByItems" :key="sortBy.value">
                        <label class="label cursor-pointer justify-start gap-3">
                            <input type="radio" :id="sortBy.value" name="order_by" :value="sortBy"
                                class="radio radio-xs radio-primary" />
                            <span class="label-text font-medium whitespace-nowrap">{{ sortBy.text }}</span>
                        </label>
                        <div class="divider my-0.5"></div>
                    </div>
                </fieldset>
                <div class="card-actions justify-end">
                    <button @click="closeDropdown()" class="btn btn-ghost">Cancel</button>
                    <button @click="applySortBy()" class="btn btn-primary">Apply</button>
                </div>
            </div>
        </div>
    </details>
</template>