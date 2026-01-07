<script setup lang="ts">
    import Window from '@/components/General/Window.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    import { ref } from 'vue';

    interface Restaurant {
        id: number;
        name: string;
        street: string;
        addressAddition?: string;
        city: string;
        zipcode: string;
        isActive: boolean;
    }

    const props = defineProps<{
        restaurant: Restaurant;
    }>();

    const emit = defineEmits(['cancel', 'success']);

    const popupStore = usePopupStore();
    const restaurantStore = useRestaurantStore();

    const localRestaurant = ref<Restaurant>({ ...props.restaurant });

    const errors = ref<string[]>(['', '', '', '', '', '']);

    const validateForm = (): boolean => {
        errors.value.fill('');
        let isValid = true;

        if (!localRestaurant.value.name ||!localRestaurant.value.name.trim()) {
            errors.value[0] = 'Bitte gib einen Restaurant-Namen ein.';
            isValid = false;
        }

        if (!localRestaurant.value.street ||!localRestaurant.value.street.trim()) {
            errors.value[1] = 'Bitte gib eine Straße ein.';
            isValid = false;
        }

        if (!localRestaurant.value.zipcode ||!localRestaurant.value.zipcode.trim()) {
            errors.value[3] = 'Bitte gib eine Postleitzahl ein.';
            isValid = false;
        }

        if (!localRestaurant.value.city || !localRestaurant.value.city.trim()) {
            errors.value[4] = 'Bitte gib eine Stadt ein.';
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm())
            return;

        try {

            popupStore.setSuccess('Restaurant-Informationen erfolgreich aktualisiert.');
            emit('success');
        } catch (error) {
            popupStore.setError('Aktualisierung fehlgeschlagen.');
        }
    };

</script>

<template>
    <Window class="p-12 border-2 border-blue-500">
        <div class="flex justify-between items-center mb-6">
            <div class="flex gap-3 items-center">
                <img src="@/assets/svgs/settingsBlack.svg" alt="Settings Icon" class="w-6">
                <h2 class="text-2xl font-semibold">Restaurant bearbeiten</h2>
            </div>
            <button class="text-blue-500 hover:text-blue-400 cursor-pointer" @click="emit('cancel')">
                Abbrechen
            </button>
        </div>

        <form @submit.prevent="" class="space-y-4">
            <CustomInputField
                v-model="localRestaurant.name"
                type="text"
                label="Restaurant Name"
                name="name"
                placeholder="z.B. Grätzlgarten"
                :error="errors[0]"/>

            <CustomInputField
                v-model="localRestaurant.street"
                type="text"
                label="Straße"
                name="street"
                placeholder="z.B. Hauptstraße"
                :error="errors[1]"/>

            <CustomInputField
                v-model="localRestaurant.addressAddition"
                type="text"
                label="Adresszusatz (optional)"
                name="addressAddition"
                placeholder="z.B. 2. Stock"/>

            <div class="flex gap-4 pb-4">
                <CustomInputField
                    v-model="localRestaurant.zipcode"
                    type="text"
                    label="Postleitzahl"
                    name="zipcode"
                    placeholder="1010"
                    :error="errors[3]"
                    class="w-40"/>
                <CustomInputField
                    v-model="localRestaurant.city"
                    type="text"
                    label="Stadt"
                    name="city"
                    placeholder="Wien"
                    :error="errors[4]"
                    class="flex-1"/>
            </div>

            <CustomButton variant="editBlue" class="w-full mt-6" @click="handleSubmit()">
                Änderungen speichern
            </CustomButton>
        </form>
    </Window>
</template>
