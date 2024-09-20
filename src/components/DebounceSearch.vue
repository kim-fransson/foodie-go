<script setup>
import SearchIcon from './icons/basic/SearchIcon.vue';
import { ref, watch } from 'vue';
import { debounce } from 'lodash';

const props = defineProps(['modelValue', 'placeholder']);
const emit = defineEmits(['update:modelValue']);

const internalModel = ref(props.modelValue);

const updateModel = debounce((value) => {
    emit('update:modelValue', value);
}, 300);

watch(internalModel, (newVal) => {
    updateModel(newVal);
});

watch(() => props.modelValue, (newVal) => {
    internalModel.value = newVal;
});

</script>

<template>
    <label class="input input-primary input-sm flex items-center gap-2">
        <SearchIcon class="size-4 shrink-0" />
        <input v-model.trim="internalModel" :placeholder="placeholder" type="text" class="grow min-w-0" />
    </label>
</template>
