<script setup lang="ts">
    import type { RestaurantErrors, RestaurantResponse } from '@/Types/restaurant.types';
    import { updateRestaurant } from '@/Services/restaurant.service';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { computed, ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import Window from '@/components/General/Window.vue';

    import GearSVG from '@/assets/svgs/settingsBlack.svg';

    const props = defineProps<{
        restaurant: RestaurantResponse;
    }>();

    const emit = defineEmits<{
        (e: 'success', restaurant: RestaurantResponse): void,
        (e: 'cancel'): void,
    }>();

    const popupStore = usePopupStore();

    const restaurant = ref<RestaurantResponse>({ ...props.restaurant });
    const errors = ref<RestaurantErrors>({
        name: '',
        street: '',
        zipcode: '',
        city: '',
    });
    
    const hasChanges = computed(() => JSON.stringify(restaurant.value) !== JSON.stringify(props.restaurant));
    
    const validate = () => {
        errors.value = {
            name: restaurant.value.name ? '' : 'Bitte einen Namen angeben.',
            street: restaurant.value.street ? '' : 'Bitte eine Straße angeben.',
            zipcode: restaurant.value.zipcode ? '' : 'Bitte eine Postleitzahl angeben.',
            city: restaurant.value.city ? '' : 'Bitte einen Ort angeben.',
        };

        return !Object.values(errors.value).some(Boolean);
    };

    const handleUpdateRestaurant = async () => {
        if (!validate())
            return;
        if (!hasChanges.value) {
            popupStore.setSuccess('Keine Änderungen vorgenommen.');
            emit('success', { ...props.restaurant });
            return;
        }

        try {
            const updatedRestaurant :RestaurantResponse = await updateRestaurant(props.restaurant.id, restaurant.value);
            emit('success', updatedRestaurant);
            popupStore.setSuccess('Restaurant erfolgreich aktualisiert.');
        } catch {
            popupStore.setError('Aktualisieren des Restaurants fehlgeschlagen.');
        }
    };

</script>

<template>
    <Window class="p-12 border-2 border-blue-500">

        <WindowHeader
            :img-src="GearSVG"
            img-alt="Ein Zahnrad"
            :showCancel="true"
            @cancel="emit('cancel')">
            Restaurant bearbeiten
        </WindowHeader>

        <div class="flex flex-col w-full">
            <form @submit.prevent="handleUpdateRestaurant()" class="flex flex-col gap-3">

                <CustomInputField
                    v-model="restaurant.name"
                    type="text"
                    label="Restaurant Name"
                    name="name"
                    placeholder="z.B. Grätzlgarten"
                    :error="errors.name"/>

                <CustomInputField
                    v-model="restaurant.street"
                    type="text"
                    label="Straße"
                    name="street"
                    placeholder="z.B. Hauptstraße 12"
                    :error="errors.street"/>

                <CustomInputField
                    v-model="restaurant.addressAddition"
                    type="text"
                    label="Addresszusatz (optional)"
                    name="addressAddition"
                    placeholder="z.B. 2. Stock"/>

                <div class="flex gap-10">
                    <CustomInputField
                        v-model="restaurant.zipcode"
                        type="text"
                        label="Postleitzahl"
                        name="zipcode"
                        placeholder="1160"
                        :error="errors.zipcode"
                        class="w-2/10"/>
                    <CustomInputField
                        v-model="restaurant.city"
                        type="text"
                        label="Ort"
                        name="city"
                        placeholder="Wien"
                        :error="errors.city"
                        class="w-full"/>
                </div>

                <CustomButton
                    variant="editBlue"
                    class="mt-4">
                    Änderungen speichern
                </CustomButton>

            </form>
        </div>
    </Window>
</template>