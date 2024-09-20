<script setup>
// todo:
//      * Scroll behavior for mobile?
//      * Accessibility improvements for keyboard
//      * Persistent translate (e.g when switching views back and forth )

import { ref, watchEffect } from 'vue';
import { useResizeObserver } from '@vueuse/core'

import ArrowIcon from './icons/basic/ArrowIcon.vue';

const TRANSLATE_AMOUNT = 200;

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
    <div ref="listRef" class="lg:overflow-hidden overflow-x-auto pl-8 lg:mt-4 relative">
        <div v-if="isLeftButtonVisible" class="lg:flex hidden top-1/2 left-0 z-50 absolute -translate-y-1/2 items-center justify-center aspect-square h-full
            bg-gradient-to-r from-base-100 to-transparent">
            <button @click="translateListLeft" class="btn-circle btn btn-xs">
                <ArrowIcon class="rotate-180 w-5 h-5" />
            </button>
        </div>
        <fieldset :style="{ transform: `translateX(-${translateList}px)` }"
            class="flex gap-12 transition-transform duration-300">
            <slot></slot>
        </fieldset>
        <div v-if="isRightButtonVisible" class="hidden lg:flex top-1/2 right-0 z-50 absolute -translate-y-1/2 items-center justify-center aspect-square h-full
            bg-gradient-to-l from-base-100 to-transparent">
            <button @click="translateListRight" class="btn-circle btn btn-xs">
                <ArrowIcon class="h-5 w-5" />
            </button>
        </div>
    </div>
</template>