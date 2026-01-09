<script setup lang="ts">
    import WindowHeader from './WindowHeader.vue';
    import CustomButton from './CustomButton.vue';
    import Window from './Window.vue';

    const emit = defineEmits(['cancel', 'delete']);

</script>

<template>
    <div @click.self="emit('cancel')" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm">
        <Window @click.stop class="p-12 shadow-none lg:h-100 lg:w-150 flex flex-col justify-between">

            <div>
                <WindowHeader>
                    Löschung bestätigen
                </WindowHeader>
                
                <slot>Warning Text.</slot>
            </div>

            <div class="flex gap-5 mt-4">
                <CustomButton
                    variant="delete"
                    class="w-full"
                    @click="emit('delete')">
                    Endgültig löschen
                </CustomButton>
                <CustomButton
                    variant="cancel"
                    class="w-full"
                    @click="emit('cancel')">
                    Abbrechen
                </CustomButton>
            </div>

        </Window>
    </div>
</template>

