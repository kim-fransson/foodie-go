<script setup>
defineProps(['label'])

const stars = Array.from({ length: 5 }, (_, i) => i + 1);
const model = defineModel()

</script>

<template>
    <div class="flex flex-col justify-start gap-2">
        <label class="label-text font-medium pl-1">{{ label }}</label>
        <div class="rating rating-half">
            <input v-model="model" :value="0" type="radio" name="rating-10" class="rating-hidden" />

            <template v-for="star in stars" :key="star">
                <input v-model="model" :value="star - 0.5" type="radio" name="rating-10"
                    class="mask mask-star-2 mask-half-1 bg-primary" />
                <input v-model="model" :value="star" type="radio" name="rating-10"
                    class="mask mask-star-2 mask-half-2 bg-primary" />
            </template>
        </div>
    </div>
</template>
