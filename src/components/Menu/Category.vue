<script setup lang="ts">
    import type { MenuCategoryResponse } from '@/Types/menu.types';

    defineProps<{
        category: MenuCategoryResponse;
    }>();

</script>

<template>
    <div class="mb-6">
        <h3 class="text-xl font-bold text-slate-900 mb-3 pb-2 border-b-2 border-ownblue-500">
            {{ category.name }}
        </h3>
        <slot></slot>
    </div>
</template>