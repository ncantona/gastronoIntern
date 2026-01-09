<script setup lang="ts">
    const props = withDefaults(defineProps<{
        label: string,
        lines: string[],
        showSeperator?: boolean,
    }>(), {
        showSeperator: true,
    });

</script>

<template>
    <div :class="showSeperator ? 'border-b border-slate-200 pb-4' : ''">
        <label class="text-sm text-slate-500 font-medium">{{ label }}</label>
        <p
            v-for="(line, index) in lines"
            :key="index"
            class="text-lg text-slate-900 mt-1">
            {{ line }}
        </p>
    </div>
</template>