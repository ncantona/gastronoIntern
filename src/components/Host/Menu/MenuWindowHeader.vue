<script setup lang="ts">
    import WindowHeader from '@/components/General/WindowHeader.vue';

    const props = defineProps<{
        amountBeverage: number,
        amountMeals: number
    }>();

</script>

<template>
    <div class="flex justify-between">

        <WindowHeader>
            Meine Speisekarte
            <div class="flex text-gray-500 text-base font-normal mt-2">
                <p>{{ amountMeals }} {{ amountMeals !== 1 ? 'Gerichte' : 'Gericht' }}</p>
                <span class="whitespace-break-spaces"> / </span>
                <p>{{ amountBeverage }} {{ amountBeverage !== 1 ? 'Getränke' : 'Getränk' }}</p>
            </div>
        </WindowHeader>

        <div class="text-gray-500 min-w-25 lg:flex hidden flex-col">
            <p class="flex items-center">
                <img src="@/assets/svgs/hamburgerIcon.svg" alt="" class="max-w-6">
                <span class="whitespace-break-spaces"> = Gericht</span>
            </p>
            <p class="flex items-center">
                <img src="@/assets/svgs/cocktailIcon.svg" alt="" class="max-w-6">
                <span class="whitespace-break-spaces"> = Getränk</span>
            </p>
        </div>
        
    </div>
</template>
