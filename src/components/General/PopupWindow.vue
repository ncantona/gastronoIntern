<script setup lang="ts">
    import successIcon from '@/assets/svgs/success.svg'
    import errorIcon from '@/assets/svgs/fail.svg'

    const emit = defineEmits(['close']);
    const props = defineProps({
        type: {
            type: String,
            default: 'success'
        }
    });

    setTimeout(() => {
        emit('close');
    }, 3000);
</script>

<template>
    <div class="fixed top-2 flex flex-row z-15 justify-center items-center bg-white/95 shadow-xl gap-4 p-4 text-xl">
        <img
            :src="type === 'success' ? successIcon : errorIcon"
            :alt="`${props.type} svg`"
            class="w-15 h-15"
        >
        <slot>Popup Message</slot>
    </div>
</template>