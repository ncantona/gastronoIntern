<script setup lang="ts">

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
        restaurant: Restaurant,
    }>();

</script>

<template>
    <div class="cursor-pointer hover:bg-gray-200/80 shadow-[0_0_8px_rgba(0,0,0,0.1)] items-center mb-4 p-3 grid grid-cols-[minmax(0,17rem)_minmax(0,17rem)_minmax(15rem,1fr)_auto] rounded-2xl">
        <div class="flex flex-col">
            <span>{{ restaurant.name }}</span>
        </div>
        <div>
            <div>
                <span>{{ restaurant.street + " " }}</span>
                <span>{{ restaurant.addressAddition }}</span>
            </div>
            <div>
                <span>{{ restaurant.zipcode + " "}}</span>
                <span>{{ restaurant.city }}</span>
            </div>
        </div>
        <div class="flex gap-3 overflow-x-hidden hover:overflow-x-auto scrollbar-overlay [@media(hover:none)]:overflow-x-auto [@media(hover:hover)]:overflow-x-hidden">
            <div v-for="category in restaurant.categories" :key="category">
                <div class="border-2 border-main-800/30 p-2 pr-3 pl-3 rounded-full whitespace-nowrap">
                    {{ category }}
                </div>
            </div>
        </div>
        <div class="flex items-center justify-end ml-8">
            <img v-show="restaurant.isActive" src="@/assets/svgs/activePulseGreen.svg" alt="Active Pulse Icon">
            <img v-show="!restaurant.isActive" src="@/assets/svgs/activePulseRed.svg" alt="Active Pulse Icon">
        </div>
    </div>
</template>