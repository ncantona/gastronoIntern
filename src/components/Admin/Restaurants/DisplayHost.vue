<script setup lang="ts">
    import Window from '@/components/General/Window.vue';

    interface RestaurantAccount {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
    };

    const props = defineProps<{
        host: RestaurantAccount,
    }>();

    const emits = defineEmits(['editHost', 'deleteHost']);


</script>

<template>
    <Window class="p-12">
        <div class="flex justify-between">
            <div class="flex gap-3 mb-5">
                <img src="@/assets/svgs/settingsBlack.svg" alt="Plus Icon" class="w-6">
                <span class="subHeader">Host verwalten</span>
            </div>
            <div class="flex gap-3">
                <button class="cursor-pointer" @click="emits('editHost')">
                    <img src="@/assets/svgs/editBlue.svg" alt="Plus Icon" class="w-7">
                </button>
                <button class="cursor-pointer" @click="emits('deleteHost')">
                    <img src="@/assets/svgs/trashRed.svg" alt="Plus Icon" class="w-7">
                </button>
            </div>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
                <span class="font-semibold">Login-ID</span>
                <span>{{ host.loginId }}</span>
            </div>
            <div class="flex justify-between gap-10">
                <div class="flex flex-col gap-2 w-5/10">
                    <span class="font-semibold">Vorname</span>
                    <span>{{ host.firstName }}</span>
                </div>
                <div class="flex flex-col gap-2 w-5/10">
                    <span class="font-semibold">Nachname</span>
                    <span>{{ host.lastName }}</span>
                </div>
            </div>
            <div class="flex flex-col gap-2 w-5/10">
                <span class="font-semibold">E-Mail-Adresse</span>
                <span>{{ host.email }}</span>
            </div>
        </div>
    </Window>
</template>