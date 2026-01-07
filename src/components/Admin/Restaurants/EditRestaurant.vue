<script setup lang="ts">
    import { useAdminRestaurantStore } from '@/stores/Admin/useRestaurantStore';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { log } from '@/utils/logger';
    import { ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
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
        restaurant: Restaurant | null;
    }>();

    const emits = defineEmits(['goBack']);

    const restaurantStore = useAdminRestaurantStore();
    const popupStore = usePopupStore();

    const restaurant = ref(
        {...props.restaurant ?? {
            id: 2,
            name: '',
            street: '',
            addressAddition: '',
            city: '',
            zipcode: '',
            isActive: true,
            categories: [],
        }
    });

    const errors = ref<[string, string, string, string, string]>([
        '', '', '', '', ''
    ]);

    const handleSubmit = async () => {
        try {
            await restaurantStore.updateRestaurant(restaurant.value);
            popupStore.setSuccess('Restaurant erfolgreich aktualisiert.')
            log.debug('Successfully updated restaurant: ', restaurant.value);
        } catch (error) {
            log.error('Failed to update restaurant.')
            popupStore.setError('Aktualisieren des Restaurants fehlgeschlagen.');
        }
    };

</script>

<template>
    <Window class="p-12 border-2 border-blue-500">
        <div class="flex justify-between items-center mb-5">
            <div class="flex gap-3 items-center">
                <img src="@/assets/svgs/settingsBlack.svg" alt="Setting Icon" class="w-6">
                <h2 class="text-2xl font-semibold">Restaurant bearbeiten</h2>
            </div>
            <button
                class="cursor-pointer text-blue-500 hover:text-blue-400 "
                @click="emits('goBack')">
                Abbrechen
            </button>
        </div>
        <div class="flex flex-col w-full">
            <form
                @submit.prevent=""
                class="flex flex-col gap-3">
                <CustomInputField
                    v-model="restaurant.name"
                    type="text"
                    label="Restaurant Name"
                    name="name"
                    placeholder="Grätzlgarten"
                    :error="errors[0]"/>
                <div class="flex gap-10">
                    <CustomInputField
                        v-model="restaurant.street"
                        type="text"
                        label="Straße"
                        name="street"
                        placeholder="Welsgasse"
                        :error="errors[1]"
                        class="w-5/10"/>
                    <CustomInputField
                        v-model="restaurant.addressAddition"
                        type="text"
                        label="Nr. / Zusatz"
                        name="addressAddition"
                        placeholder="18a"
                        class="w-5/10"/>
                </div>
                <div class="flex gap-10">
                    <CustomInputField
                        v-model="restaurant.city"
                        type="text"
                        label="Ort"
                        name="city"
                        placeholder="Wien"
                        :error="errors[2]"
                        class="w-5/10"/>
                    <CustomInputField
                        v-model="restaurant.zipcode"
                        type="text"
                        label="Postleitzahl"
                        name="zipcode"
                        placeholder="1160"
                        :error="errors[3]"
                        class="w-5/10"/>
                </div>
                <CustomButton
                    variant="editBlue"
                    class="mt-4"
                    @click="handleSubmit()">
                    Änderungen speichern
                </CustomButton>
            </form>
        </div>
    </Window>
</template>