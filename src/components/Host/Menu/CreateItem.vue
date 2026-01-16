<script setup lang="ts">
    import CustomButton from '@/components/General/CustomButton.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import TypeDropDown from './TypeDropDown.vue';
    import { ref } from 'vue';
    import { useRestaurantItemsStore } from '@/stores/Restaurant/useRestaurantItemsStore';
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
import WindowHeader from '@/components/General/WindowHeader.vue';

    type ItemType = 'BEVERAGE' | 'MEAL';

    interface Item {
        id: number;
        name: string;
        description: string;
        categoryName: string;
        categoryPosition: number;
        position: number;
        code: string;
        itemType: ItemType;
        price: number;
        rating: number;
        prepTime: string;
        isAvailable: boolean;
    };

    const props = defineProps<{
        categoryId: number,
        categoryName: string,
        categoryPosition: number,
        itemPosition: number,
    }>();

    const emit = defineEmits(['cancel', 'success']);

    const itemType = ref<ItemType>('MEAL');

    const restaurantItemsStore = useRestaurantItemsStore();
    const restaurantStore = useRestaurantStore();

    const options = [
        { label: 'Gericht', value: 'MEAL' },
        { label: 'Getränk', value: 'BEVERAGE' },
    ];

    const itemName = ref<string>('');
    const itemPrice = ref<number>();
    const itemDescription = ref<string>('');
    const itemCode = ref<string>('');

    const errorItemName = ref<string>('');
    const errorItemPrice = ref<string>('');
    const errorItemCode = ref<string>('');

    const createItem = async () => {

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
                categoryId: props.categoryId,
                position: props.itemPosition + 1,
                code: itemCode.value,
                itemType: itemType.value,
                price: itemPrice.value,
                isAvailable: false,
                restaurantId: restaurantStore.restaurant.id,
            } as Partial<Item>;

            restaurantItemsStore.createItem(restaurantStore.restaurant.id, item);
            emit('success');
        } catch {
            
        }
    }

</script>

<template>
    <div @click.stop class="absolute bg-white justify-center inset-0 z-50 h-full lg:bg-transparent lg:relative lg:h-auto p-7 mb-5 flex flex-col lg:gap-4 gap-2 lg:border-2 rounded-xl border-[rgb(37,99,235)]">
        <WindowHeader>Neues Gericht / Getränk hinzufügen</WindowHeader>
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

            <TypeDropDown :options="options" v-model="itemType" class="lg:w-3/10"/>

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
            <textarea name="itemDescription" id="itemDescription" v-model="itemDescription" placeholder="Beschreibe das Gericht oder das Getränk ..." class="border border-main-500 h-30 rounded-lg p-3 hover:outline-1 hover:outline-main-500 focus-within:outline-2 focus-within:outline-main-500 focus-within:hover:outline-2"></textarea>
        
        </div>
        <div class="flex lg:flex-row flex-col lg:gap-5 w-full">

            <CustomButton
                variant="editBlue"
                class="mt-5 w-full"
                @click="createItem()">
                Speichern
            </CustomButton>

            <CustomButton
                variant="cancel"
                class="mt-5 w-full"
                @click="emit('cancel')">
                Abbrechen
            </CustomButton>

        </div>
    </div>
</template>