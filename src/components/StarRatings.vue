<script setup>
defineProps(['label'])
</script>

<template>
    <div class="flex flex-col justify-start gap-2">
        <label class="label-text font-medium pl-1">{{ label }}</label>
        <div class="rating rating-half">
            <input type="radio" name="rating-10" class="rating-hidden" />
            <input type="radio" name="rating-10" class="mask mask-star-2 mask-half-1 bg-primary" />
            <input type="radio" name="rating-10" class="mask mask-star-2 mask-half-2 bg-primary" />
            <input type="radio" name="rating-10" class="mask mask-star-2 mask-half-1 bg-primary" checked="checked" />
            <input type="radio" name="rating-10" class="mask mask-star-2 mask-half-2 bg-primary" />
            <input type="radio" name="rating-10" class="mask mask-star-2 mask-half-1 bg-primary" />
            <input type="radio" name="rating-10" class="mask mask-star-2 mask-half-2 bg-primary" />
            <input type="radio" name="rating-10" class="mask mask-star-2 mask-half-1 bg-primary" />
            <input type="radio" name="rating-10" class="mask mask-star-2 mask-half-2 bg-primary" />
            <input type="radio" name="rating-10" class="mask mask-star-2 mask-half-1 bg-primary" />
            <input type="radio" name="rating-10" class="mask mask-star-2 mask-half-2 bg-primary" />
        </div>
    </div>
</template>