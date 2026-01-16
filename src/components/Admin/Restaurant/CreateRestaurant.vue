<script setup lang="ts">
    import type { RestaurantErrors, RestaurantRequest, RestaurantResponse } from '@/Types/restaurant.types';
    import { createRestaurant } from '@/Services/restaurant.service';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import Window from '@/components/General/Window.vue';
    
    import PlusInCircleSVG from '@/assets/svgs/plusBlack.svg'

    const emit = defineEmits<{
        (e: 'success', restaurant: RestaurantResponse): void,
    }>();

    const popupStore = usePopupStore();

    const initialRestaurant = <RestaurantRequest>{
        name: '',
        street: '',
        addressAddition: '',
        isActive: true,
        city: '',
        zipcode: '',
    }

    const restaurant = ref<RestaurantRequest>({ ...initialRestaurant });
    const errors = ref<RestaurantErrors>({
        name: '',
        street: '',
        zipcode: '',
        city: '',
    });

    const resetForm = () => restaurant.value = { ...initialRestaurant };
    const scrollWindowTop = () => window.scroll(0, 0);
    
    const validate = () => {
        errors.value = {
            name: restaurant.value.name.trim() ? '' : 'Bitte einen Namen angeben.',
            street: restaurant.value.street.trim() ? '' : 'Bitte eine Straße angeben.',
            zipcode: restaurant.value.zipcode.trim() ? '' : 'Bitte eine Postleitzahl angeben.',
            city: restaurant.value.city.trim() ? '' : 'Bitte einen Ort angeben.',
        };

        return !Object.values(errors.value).some(Boolean);
    };

    const handleCreateRestaurant = async () => {
        if (!validate())
            return;

        try {
            const newRestaurant = await createRestaurant(restaurant.value);
            popupStore.setSuccess('Restaurant erfolgreich angelegt.')
            emit('success', newRestaurant);
            resetForm();
            scrollWindowTop();
        } catch (error) {
            popupStore.setError('Anlegen des Restaurants fehlgeschlagen.');
        }
    };


</script>

<template>
    <Window class="p-12">

        <WindowHeader
            :img-src="PlusInCircleSVG"
            img-alt="Ein Pluszeichen in einem Kreis">
            Restaurant anlegen
        </WindowHeader>

        <div class="flex flex-col w-full">
            <form @submit.prevent="handleCreateRestaurant()" class="flex flex-col gap-3">

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
                    variant="submit"
                    class="mt-4">
                    Restaurant anlegen
                </CustomButton>
            </form>
        </div>

    </Window>
</template>