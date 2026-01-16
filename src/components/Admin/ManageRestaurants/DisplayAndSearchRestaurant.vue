<script setup lang="ts">
    import { loadRestaurantsWithQuery, loadRestaurants } from '@/Services/restaurant.service';
    import type { RestaurantResponse } from '@/Types/restaurant.types';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { onMounted, ref, watch } from 'vue';
    
    import RestaurantInfoShort from '@/components/Admin/ManageRestaurants/RestaurantInfoShort.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import Window from '@/components/General/Window.vue';

    import GearSVG from '@/assets/svgs/settingsBlack.svg';

    const value = defineModel<RestaurantResponse | null>();

    const popupStore = usePopupStore();

    const restaurants = ref<RestaurantResponse[]>([]);

    const searchRestaurant = ref<string>('');
    const reset = ref<boolean>(false);
    const oldSearch = ref<string>('');

    watch(searchRestaurant, async (newValue) => {
        if (reset.value === true && !newValue.trim()) {
            restaurants.value = await loadRestaurants(0, 5);
            reset.value = false;
            oldSearch.value = '';
            return;
        }
        else if (!newValue.trim() || oldSearch.value === newValue.trim())
            return;

        try {
            restaurants.value = await loadRestaurantsWithQuery(newValue.trim(), 0, 5);
            oldSearch.value = newValue.trim();
            reset.value = true;
        } catch {
            popupStore.setError('Fehler beim Laden der Restaurants.');
        }
    });

    const scrollWindowTop = () => window.scroll(0, 0);

    onMounted(async () => {
        restaurants.value = await loadRestaurants(0, 5);
    });

</script>

<template>
    <Window class="p-12">

        <WindowHeader
            :imgSrc="GearSVG"
            imgAlt="Ein Zahnrad">
            Restaurants verwalten
        </WindowHeader>

        <div class="flex flex-col h-200">

            <CustomInputField
                v-model="searchRestaurant"
                type="text"
                name="searchRestaurant"
                placeholder="Nach welchem Restaurant soll ich suchen?"/>

            <div class="grid mt-10 grid-cols-[7rem_14rem_14rem_auto] font-medium text-xl border-b border-slate-200 pb-4 mb-5">
                <h3 class="col-start-2 text-slate-900">Name</h3>
                <h3 class="col-start-3 text-slate-900">Adresse</h3>
            </div>

            <div class="flex flex-col gap-4">
                <RestaurantInfoShort
                    v-for="restaurant in restaurants"
                    :key="restaurant.id"
                    :restaurant="restaurant"
                    :searchValue="searchRestaurant"
                    @click="value = restaurant; scrollWindowTop()"/>
            </div>

            <h4
                v-show="restaurants.length === 0"
                class="flex h-100 text-lg w-full items-center justify-center text-gray-500">
                Keine Restaurants gefunden.
            </h4>

        </div>
        
    </Window>
</template>