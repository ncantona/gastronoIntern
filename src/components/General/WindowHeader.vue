<script setup lang="ts">
    import CancelButton from '@/components/General/CancelButton.vue';

    const props = defineProps<{
        imgSrc?: string,
        imgAlt?: string,
        showCancel?: boolean,
        showEdit?: boolean,
        showDelete?: boolean,
    }>();

    const emit = defineEmits(['cancel', 'edit', 'delete']);

</script>

<template>
    <div class="flex gap-3 items-center mb-6 w-full justify-between">
        <div class="flex gap-3 items-center">
            <img v-show="imgSrc" :src="imgSrc" :alt="imgAlt" class="w-6">
            <h2 class="text-2xl font-semibold">
                <slot>Window Header</slot>
            </h2>
        </div>

        <CancelButton
            v-if="showCancel && !(showEdit || showDelete)"
            @click="emit('cancel')"/>

        <div v-if="showEdit || showDelete" class="flex gap-3">
            <button v-if="showEdit" class="cursor-pointer" @click="emit('edit')">
                <img src="@/assets/svgs/editBlue.svg" alt="Plus Icon" class="max-w-7">
            </button>
            <button v-if="showDelete" class="cursor-pointer" @click="emit('delete')">
                <img src="@/assets/svgs/trashRed.svg" alt="Plus Icon" class="max-w-7">
            </button>
        </div>
    </div>
</template>