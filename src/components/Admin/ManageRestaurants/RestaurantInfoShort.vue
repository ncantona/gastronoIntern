<script setup lang="ts">
    import type { RestaurantResponse } from '@/Types/restaurant.types';
    import { computed, ref } from 'vue';

    const props = defineProps<{
        restaurant: RestaurantResponse,
        searchValue: string,
    }>();

    const addressSecondPart = ref<string>(
        props.restaurant.zipcode + ' ' + props.restaurant.city,
    );

    const highlight = (text: string) => {
        const search = props.searchValue.trim();

        if (!search)
            return (text);

        const regex = new RegExp(`(${search})`, 'gi');

        return (text.replace(regex, '<span class="bg-blue-200/80 rounded">$1</span>'));
    };

    const highlightedName = computed(() => highlight(props.restaurant.name));
    const highlightedStreet = computed(() => highlight(
        props.restaurant.street + ' ' + (props.restaurant.addressAddition ?? '')));

</script>

<template>
    <div class="border border-gray-300 items-center cursor-pointer bg-gray-50 rounded-xl p-5 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg grid grid-cols-[6rem_14rem_14rem_auto]">

        <img src="@/assets/svgs/restaurantIcon.svg" alt="Icon von einer Gabel und Messer nebeneinander" class="max-w-18">

        <p class="text-lg text-slate-900 mt-1 font-medium" v-html="highlightedName"></p>
        
        <div>
            <p class="text-lg text-slate-900 mt-1" v-html="highlightedStreet"></p>
            <p class="text-lg text-slate-900 mt-1">{{ addressSecondPart }}</p>
        </div>

        <div class="flex items-center justify-end mx-6">
            <img v-show="restaurant.isActive" src="@/assets/svgs/activePulseGreen.svg" alt="Pulsierender Grüner Punkt">
            <img v-show="!restaurant.isActive" src="@/assets/svgs/activePulseRed.svg" alt="Pulsierender Roter Punkt">
        </div>

    </div>
</template>