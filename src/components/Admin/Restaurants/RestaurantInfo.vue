<script setup lang="ts">
    import { useRestaurantStore } from '@/stores/Admin/useRestaurantStore';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { log } from '@/utils/logger';
    import { ref } from 'vue';
    
    import EditRestaurant from '@/components/Admin/Restaurants/EditRestaurant.vue';
    import ManageAccounts from '@/components/Admin/Restaurants/ManageAccounts.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import ToggleSwitch from '@/components/General/ToggleSwitch.vue';

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

    const restaurantStore = useRestaurantStore();
    const popupStore = usePopupStore();

    const showEditAccounts = ref<boolean>(false);
    const showEditRestaurant = ref<boolean>(false);

    const toggleRestaurantStatus = (id :number) => {
        try {
            restaurantStore.toggleRestaurantStatus(id);
            log.debug('Successfully toggled restaurant status.');
        } catch {
            log.error('Fehler bei Statusänderung.')
            popupStore.error = 'Fehler bei Statusänderung.'
        }
    };

</script>

<template>
    <div class="shadow-xl items-center text-xl mb-4 p-3 grid 2xl:grid-cols-[minmax(0,20rem)_minmax(0,20rem)_minmax(0,37rem)_minmax(15rem,1fr)] rounded-2xl">
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
        <div class="flex gap-3 max-w-150 overflow-x-hidden hover:overflow-x-auto scrollbar-overlay [@media(hover:none)]:overflow-x-auto [@media(hover:hover)]:overflow-x-hidden">
            <div v-for="category in restaurant.categories">
                <div class="border-2 border-main-800/30 p-2 pr-3 pl-3 rounded-full whitespace-nowrap">
                    {{ category }}
                </div>
            </div>
        </div>
        <div class="flex gap-4 justify-end items-center">
            <ToggleSwitch v-model="restaurant.isActive" @click="toggleRestaurantStatus(restaurant.id)"/>
            <CustomButton
                variant="editYellow"
                @click="showEditAccounts = true">
                <img src="@/assets/svgs/usersWhite.svg" alt="Users Icon" class="w-6">
            </CustomButton>
            <CustomButton
                variant="editBlue"
                @click="showEditRestaurant = true">
                <img src="@/assets/svgs/editWhite.svg" alt="Edit Icon" class="w-6">
            </CustomButton>
        </div>
        <EditRestaurant v-if="showEditRestaurant" :restaurant="restaurant" @editSuccess="showEditRestaurant = false"/>
        <ManageAccounts v-if="showEditAccounts" @editSuccess="showEditAccounts = false" :restaurantId="props.restaurant.id" :restaurantName="props.restaurant.name"/>
    </div>
</template>