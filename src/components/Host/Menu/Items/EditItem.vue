<script setup lang="ts">
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    import type { ItemRequest, ItemResponse, ItemType } from '@/Types/item.types';
    import { ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import GearSVG from '@/assets/svgs/settingsBlack.svg';
    import CustomButton from '@/components/General/CustomButton.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import TypeDropDown from './TypeDropDown.vue';
import { updateItem } from '@/Services/item.service';

    const props = defineProps<{
        item: ItemResponse,
    }>();

    const emit = defineEmits<{
        (e: 'success', updatedItem: ItemResponse): void,
        (e: 'cancel'): void
    }>();

    const itemType = ref<ItemType>(props.item.itemType);

    const restaurantStore = useRestaurantStore();

    const options = [
        { label: 'Gericht', value: 'MEAL' },
        { label: 'Getränk', value: 'BEVERAGE' },
    ];

    const itemName = ref<string>(props.item.name);
    const itemPrice = ref<number>(props.item.price);
    const itemDescription = ref<string>(props.item.description);
    const itemCode = ref<string>(props.item.code);

    const errorItemName = ref<string>('');
    const errorItemPrice = ref<string>('');
    const errorItemCode = ref<string>('');

    const handleUpdateItem = async () => {

        errorItemName.value = '';
        errorItemCode.value = '';
        errorItemPrice.value = '';

        if (!itemName.value)
            errorItemName.value = 'Ein Name muss angegeben werden.';
        if (!itemCode.value)
            errorItemCode.value = 'Ein Code muss angegeben werden.';
        if (!itemPrice.value)
            errorItemPrice.value = 'Ein Preis muss angegeben werden.';
        if (!errorItemName.value && !errorItemPrice.value && !errorItemCode.value && restaurantStore.restaurant)
        try {
            const item = {
                name: itemName.value,
                description: itemDescription.value,
                categoryId: props.item.categoryId,
                position: props.item.position,
                code: itemCode.value,
                itemType: itemType.value,
                price: itemPrice.value,
                isAvailable: props.item.isAvailable,
                restaurantId: restaurantStore.restaurant.id,
            } as ItemRequest;
            const updatedItem = await updateItem(item, props.item.id, props.item.restaurantId);
            emit('success', updatedItem);
        } catch {
            
        }
    }

</script>

<template>
    <div @click.stop class="min-h-150 bg-white justify-center h-full lg:bg-transparent lg:relative lg:h-auto p-7 flex flex-col lg:gap-4 gap-2 lg:border-2 rounded-xl border-ownblue-500">
        <div>
            <WindowHeader
            :imgSrc="GearSVG"
            imgAlt="Ein Zahnrad">
                Gericht / Getränk bearbeiten
            </WindowHeader>
        </div>
        <form @submit.prevent="handleUpdateItem()">
            <div class="flex lg:flex-row flex-col lg:gap-5 gap-2 lg:justify-between">

            <CustomInputField
                v-model="itemName"
                type="text"
                label="Name"
                name="itemName"
                placeholder="z.B. Thunfisch Salat"
                :error="errorItemName"
                class="lg:w-6/10"/>

            <CustomInputField
                v-model="itemPrice"
                type="number"
                label="Preis ( € )"
                name="itemPrice"
                placeholder="15.80"
                :error="errorItemPrice"
                class="lg:w-3/10"/>

            </div>
            <div class="flex lg:gap-5 gap-2 lg:items-center lg:justify-between lg:flex-row flex-col">

                <TypeDropDown
                    :options="options"
                    v-model="itemType"
                    class="lg:w-3/10"/>

                <CustomInputField
                    v-model="itemCode"
                    type="text"
                    label="Code"
                    name="itemCode"
                    placeholder="SU01"
                    :error="errorItemCode"
                    class="lg:w-3/10"/>

            </div>
            <div class="flex flex-col gap-2">

                <label for="itemDescription">Beschreibung</label>
                <textarea
                    name="itemDescription"
                    id="itemDescription"
                    v-model="itemDescription"
                    placeholder="Beschreibe das Gericht oder das Getränk ..."
                    class="border border-main-500 h-30 rounded-lg p-3 hover:outline-1 hover:outline-main-500 focus-within:outline-2 focus-within:outline-main-500 focus-within:hover:outline-2">
                </textarea>
            
            </div>
            <div class="flex lg:flex-row flex-col lg:gap-5 w-full">

                <CustomButton
                    variant="editBlue"
                    class="mt-5 w-full">
                    Speichern
                </CustomButton>

                <CustomButton
                    type="button"
                    variant="cancel"
                    class="mt-5 w-full"
                    @click="emit('cancel')">
                    Abbrechen
                </CustomButton>

            </div>
        </form>
    </div>
</template>