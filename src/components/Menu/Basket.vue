<script setup lang="ts">
    import { ref, watch } from 'vue';

    const props = defineProps<{
        tableId: number
    }>();

    const tableId = ref<number>(props.tableId);

    watch(() => props.tableId, newId => {
        tableId.value = newId;
    });
</script>

<template>
    
</template>