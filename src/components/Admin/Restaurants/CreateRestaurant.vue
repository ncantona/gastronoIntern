<script setup lang="ts">
    import { useRestaurantStore } from '@/stores/Admin/useRestaurantStore';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { log } from '@/utils/logger';
    import { ref } from 'vue';

    import RestaurantConfirmation from '@/components/Admin/Restaurants/RestaurantConfirmation.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';

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

    const emits = defineEmits(['createSuccess']);

    const restaurantStore = useRestaurantStore();
    const popupStore = usePopupStore();

    const showConfirmation = ref<boolean>(false);

    const restaurant = ref({
        name: '',
        street: '',
        addressAddition: '',
        zipcode: '',
        city: '',
    } as Restaurant);

    const errors = ref<[string, string, string, string, string]>([
        '', '', '', '', ''
    ]);

    const handleSubmit = async () => {
        try {
            await restaurantStore.createRestaurant(restaurant.value);
            popupStore.setSuccess('Restaurant erfolgreich angelegt.')
            log.debug('Successfully created restaurant: ', restaurant.value);
            emits('createSuccess');
        } catch (error) {
            log.error('Failed to create restaurant.')
            popupStore.setError('Anlegen des Restaurants fehlgeschlagen.');
        }
    };

    const handleNext = () => {
        errors.value.fill('');

        if (!restaurant.value.name)
            errors.value[0] = 'Bitte einen Namen angeben.';
        if (!restaurant.value.street)
            errors.value[1] = 'Bitte eine Adresse angeben.';
        if (!restaurant.value.city)
            errors.value[2] = 'Bitte einen Ort angeben.';
        if (!restaurant.value.zipcode)
            errors.value[3] = 'Bitte eine Postleitzahl angeben.';
        if (!(errors.value[0] || errors.value[1] || errors.value[2] || errors.value[3]))
            showConfirmation.value = true;
    };

</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm text-xl" @click="emits('createSuccess')">
        <div class="self-center h-full items-center justify-center lg:h-auto flex flex-col gap-5 bg-white/90 shadow-xl rounded-lg p-5" @click.stop>
            <form
                @submit.prevent=""
                class="max-w-100 w-full min-w-125 justify-center flex flex-col gap-5 p-5">
                <span class="mainHeader mb-4">
                    Neues Restaurant anlegen
                </span>
                <CustomInputField
                    v-model="restaurant.name"
                    type="text"
                    label="Restaurant Name"
                    name="name"
                    placeholder="Grätzlgarten"
                    :error="errors[0]"
                />
                <div class="flex gap-5 w-full">
                    <CustomInputField
                        v-model="restaurant.street"
                        type="text"
                        label="Straße"
                        name="street"
                        placeholder="Welsgasse"
                        :error="errors[1]"
                        class="w-7/10"
                    />
                    <CustomInputField
                        v-model="restaurant.addressAddition"
                        type="text"
                        label="Nr. / Zusatz"
                        name="addressAddition"
                        placeholder="18a"
                        class="w-3/10"
                    />
                </div>
                <CustomInputField
                    v-model="restaurant.city"
                    type="text"
                    label="Ort"
                    name="city"
                    placeholder="Wien"
                    :error="errors[2]"
                    />
                <CustomInputField
                    v-model="restaurant.zipcode"
                    type="text"
                    label="Postleitzahl"
                    name="zipcode"
                    placeholder="1160"
                    :error="errors[3]"
                    />
                <CustomButton
                    variant="submit"
                    class="mt-4"
                    @click="handleNext()">
                    Restaurant anlegen
                </CustomButton>
            </form>
        </div>
        <RestaurantConfirmation
            v-model="showConfirmation"
            :restaurant="restaurant"
            @canceled="showConfirmation = false"
            @confirmed="handleSubmit()"/>
    </div>
</template>