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
        <div class="flex justify-between mb-6">
            <h2 class="text-2xl font-semibold">Host-Informationen</h2>
            <div class="flex gap-3">
                <button class="cursor-pointer" @click="emits('editHost')">
                    <img src="@/assets/svgs/editBlue.svg" alt="Plus Icon" class="w-7">
                </button>
                <button class="cursor-pointer" @click="emits('deleteHost')">
                    <img src="@/assets/svgs/trashRed.svg" alt="Plus Icon" class="w-7">
                </button>
            </div>
        </div>

        <div class="space-y-6">
            <div class="border-b border-slate-200 pb-4">
                <label class="text-sm text-slate-500 font-medium">Login-ID</label>
                <p class="text-lg text-slate-900 mt-1">{{ host.loginId }}</p>
            </div>

            <div class="border-b border-slate-200 pb-4">
                <label class="text-sm text-slate-500 font-medium">Name</label>
                <p class="text-lg text-slate-900 mt-1">{{ host.firstName }} {{ host.lastName }}</p>
            </div>

            <div>
                <label class="text-sm text-slate-500 font-medium">E-Mail-Adresse</label>
                <p class="text-lg text-slate-900 mt-1">{{ host.email }}</p>
            </div>
        </div>
    </Window>
</template>