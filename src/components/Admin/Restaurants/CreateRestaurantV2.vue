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

    const emit = defineEmits<{
        (e: 'createSuccess', restaurant: Restaurant): void
    }>();

    const restaurantStore = useAdminRestaurantStore();
    const popupStore = usePopupStore();

    const restaurant = ref({
        name: '',
        street: '',
        addressAddition: '',
        isActive: true,
        zipcode: '',
        city: '',
    } as Restaurant);

    const errors = ref<[string, string, string, string, string]>([
        '', '', '', '', ''
    ]);

    const handleSubmit = async () => {
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
            try {
                await restaurantStore.createRestaurant(restaurant.value);
                popupStore.setSuccess('Restaurant erfolgreich angelegt.')
                log.debug('Successfully created restaurant: ', restaurant.value);
                emit('createSuccess', { ...restaurant.value });
                restaurant.value.name = '';
                restaurant.value.street = '';
                restaurant.value.addressAddition = '';
                restaurant.value.city = '';
                restaurant.value.zipcode = '';
                scrollWindowTop();
            } catch (error) {
                log.error('Failed to create restaurant.')
                popupStore.setError('Anlegen des Restaurants fehlgeschlagen.');
            }
    };

    const scrollWindowTop = () => window.scroll(0, 0);

</script>

<template>
    <Window class="p-12">
        <div class="flex gap-3 mb-5">
            <img src="@/assets/svgs/plusBlack.svg" alt="Plus Icon" class="w-6">
            <span class="subHeader">Restaurant anlegen</span>
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
                    :error="errors[0]"
                />
                <div class="flex gap-10">
                    <CustomInputField
                        v-model="restaurant.street"
                        type="text"
                        label="Straße"
                        name="street"
                        placeholder="Welsgasse"
                        :error="errors[1]"
                        class="w-5/10"
                    />
                    <CustomInputField
                        v-model="restaurant.addressAddition"
                        type="text"
                        label="Nr. / Zusatz"
                        name="addressAddition"
                        placeholder="18a"
                        class="w-5/10"
                    />
                </div>
                <div class="flex gap-10">
                    <CustomInputField
                        v-model="restaurant.city"
                        type="text"
                        label="Ort"
                        name="city"
                        placeholder="Wien"
                        :error="errors[2]"
                        class="w-5/10"
                        />
                    <CustomInputField
                        v-model="restaurant.zipcode"
                        type="text"
                        label="Postleitzahl"
                        name="zipcode"
                        placeholder="1160"
                        :error="errors[3]"
                        class="w-5/10"
                        />
                </div>
                <CustomButton
                    variant="submit"
                    class="mt-4"
                    @click="handleSubmit()">
                    Restaurant anlegen
                </CustomButton>
            </form>
        </div>
    </Window>
</template>