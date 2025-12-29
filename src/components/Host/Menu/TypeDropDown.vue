<script setup lang="ts">
    import { ref } from 'vue';

    interface Option {
        label: string;
        value: string | number;
    }

    const props = defineProps<{
        options: Option[];
    }>();
    
    const selectedValue = defineModel<string>();

</script>

<template>
    <div
        role="radiogroup"
        class="flex flex-col gap-2">
        <label
            v-for="option in options"
            :key="option.value"
            class="flex items-center gap-3 cursor-pointer px-4 py-3 transition focus-within:ring-2 focus-within:ring-main-500 rounded-xl">
        <input
            type="radio"
            class="sr-only"
            :value="option.value"
            v-model="selectedValue"/>

            <span
                class="h-4 w-4 rounded-full border-2 flex items-center justify-center"
                :class="selectedValue === option.value ? 'border-main-500' : 'border-gray-400'">
                <span
                v-if="selectedValue === option.value"
                class="h-2 w-2 rounded-full bg-main-500">
                </span>
            </span>

            <span class="font-medium">
                {{ option.label }}
            </span>
        </label>
    </div>
</template>
