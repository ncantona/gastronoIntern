<script setup lang="ts">
    import Basket from '@/components/Menu/Basket.vue';
    import DisplayMenu from '@/components/Menu/DisplayMenu.vue';

    const props = defineProps<{
        tableId: number
    }>();

</script>

<template>
    <div class="flex justify-center min-h-screen w-full">
        <DisplayMenu/>
        <Basket :tableId="tableId"/>
    </div>
</template>