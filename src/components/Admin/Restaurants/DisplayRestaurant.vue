<script setup lang="ts">
    import ToggleSwitch from '@/components/General/ToggleSwitch.vue';
    import Window from '@/components/General/Window.vue';

    interface Restaurant {
        id: number,
        name: string,
        street: string,
        addressAddition: string,
        city: string,
        zipcode: string,
        isActive: boolean,
        categories: string[],
    }

    const props = defineProps<{
        restaurant: Restaurant;
    }>();

    const emits = defineEmits(['editRestaurant']);

</script>

<template>
    <Window class="p-12">
        <div class="flex justify-between items-center">
            <div class="flex gap-3 mb-5">
                <img src="@/assets/svgs/settingsBlack.svg" alt="Plus Icon" class="w-6">
                <span class="subHeader">Restaurant verwalten</span>
            </div>
            <div class="flex gap-4">
                <button class="cursor-pointer" @click="emits('editRestaurant')">
                    <img src="@/assets/svgs/editBlue.svg" alt="Plus Icon" class="w-7">
                </button>
                <ToggleSwitch v-model="restaurant.isActive"></ToggleSwitch>
            </div>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
                <span class="font-semibold">Restaurant Name</span>
                <span>{{ restaurant.name }}</span>
            </div>
            <div class="flex justify-between gap-10">
                <div class="flex flex-col gap-2 w-5/10">
                    <span class="font-semibold">Straße</span>
                    <span>{{ restaurant.street }}</span>
                </div>
                <div class="flex flex-col gap-2 w-5/10">
                    <span class="font-semibold">Nr. / Zusatz</span>
                    <span>{{ restaurant.addressAddition }}</span>
                </div>
            </div>
            <div class="flex justify-between gap-10">
                <div class="flex flex-col gap-2 w-5/10">
                    <span class="font-semibold">Ort</span>
                    <span>{{ restaurant.city }}</span>
                </div>
                <div class="flex flex-col gap-2 w-5/10">
                    <span class="font-semibold">Postleitzahl</span>
                    <span>{{ restaurant.zipcode }}</span>
                </div>
            </div>
        </div>
    </Window>
</template>