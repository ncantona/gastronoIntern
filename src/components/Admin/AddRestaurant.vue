<script setup lang="ts">
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import { useRestaurantStore } from '@/stores/Admin/useRestaurantStore';
    import CustomButton from '@/components/General/CustomButton.vue';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { log } from '@/utils/logger';
    import { ref } from 'vue';

    const emits = defineEmits(['registerSuccess']);

    const restaurantStore = useRestaurantStore();
    const popupStore = usePopupStore();

    const name = ref<string>('');
    const street = ref<string>('');
    const addressAddition = ref<string>('');
    const zipcode = ref<string>('');
    const city = ref<string>('');

    const errorName = ref<string>('');
    const errorStreet = ref<string>('');
    const errorAddressAddition = ref<string>('');
    const errorZipcode = ref<string>('');
    const errorCity = ref<string>('');

    const clearFields = () => {
        name.value = '';
        street.value = '';
        addressAddition.value = '';
        zipcode.value = '';
        city.value = '';
    }

    const clearErrors = () => {
        errorName.value = '';
        errorStreet.value = '';
        errorAddressAddition.value = '';
        errorZipcode.value = '';
        errorCity.value = '';
    }

    const handleSubmit = async () => {
        const restaurantData = {
            name: name.value,
            street: street.value,
            addressAddition: addressAddition.value,
            zipcode: zipcode.value,
            city: city.value
        };

        clearErrors();

        if (!restaurantData.name)
            errorName.value = 'Bitte einen Namen angeben.';
        if (!restaurantData.street)
            errorStreet.value = 'Bitte eine Straße angeben.';
        if (!restaurantData.city)
            errorCity.value = 'Bitte einen Ort angeben.';
        if (!restaurantData.zipcode)
            errorZipcode.value = 'Bitte eine Postleitzahl angeben.';
        if (!(errorName.value || errorStreet.value || errorAddressAddition.value
        || errorZipcode.value || errorCity.value)) {
            try {
                log.info('Trying to create restaurant.');
                await restaurantStore.addRestaurant(restaurantData);
                popupStore.setSuccess('Restaurant erfolgreich angelegt.')
                log.debug('Successfully created restaurant: ', restaurantData);
                clearFields();
            } catch (error) {
                log.error('Failed to create restaurant.')
                popupStore.setError('Anlegen des Restaurants fehlgeschlagen.');
            }
        }
    }

</script>

<template>
    <div class="flex flex-col h-full max-full gap-5 justify-center">
        <div class="self-center h-full items-center justify-center lg:h-auto flex flex-col gap-5 bg-white/80 shadow-xl lg:rounded-lg p-5">
        <form
            @submit.prevent=""
            class="max-w-100 w-full lg:min-w-125 justify-center flex flex-col gap-5 p-5">
            <span class="mainHeader mb-4">Neues Restaurant anlegen</span>
            <CustomInputField
                v-model="name"
                type="text"
                label="Restaurant Name"
                name="name"
                placeholder="Grätzlgarten"
                :error="errorName"
            />
            <div class="flex gap-5 w-full">
                <CustomInputField
                    v-model="street"
                    type="text"
                    label="Straße"
                    name="street"
                    placeholder="Welsgasse"
                    :error="errorStreet"
                    class="w-7/10"
                />
                <CustomInputField
                    v-model="addressAddition"
                    type="text"
                    label="Nr. / Zusatz"
                    name="addressAddition"
                    placeholder="18a"
                    :error="errorAddressAddition"
                    class="w-3/10"
                />
            </div>
            <CustomInputField
                v-model="city"
                type="text"
                label="Ort"
                name="city"
                placeholder="Wien"
                :error="errorCity"
                />
            <CustomInputField
                v-model="zipcode"
                type="text"
                label="Postleitzahl"
                name="zipcode"
                placeholder="1160"
                :error="errorZipcode"
                />
            <CustomButton class="mt-4" @click="handleSubmit">Anlegen</CustomButton>
        </form>
        </div>
    </div>
</template>