<script setup lang="ts">
    import CustomButton from '@/components/General/CustomButton.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import Window from '@/components/General/Window.vue';
    import TypeDropDown from './TypeDropDown.vue';
    import { ref } from 'vue';
    import { useRestaurantItemsStore } from '@/stores/Restaurant/useRestaurantItemsStore';
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';

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
        categoryName: string,
        categoryPosition: number,
        itemPosition: number,
    }>();

    const emit = defineEmits(['cancel', 'success']);

    const itemType = ref<ItemType>('MEAL');

    const restaurantItemsStore = useRestaurantItemsStore();
    const restaurantStore = useRestaurantStore();

    const options = [
        { label: 'Speise', value: 'MEAL' },
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
        if (!errorItemName.value && !errorItemPrice.value && !errorItemCode.value)
        try {
            const item = {
                name: itemName.value,
                description: itemDescription.value,
                categoryName: props.categoryName,
                categoryPosition: props.categoryPosition,
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
    <div class="fixed inset-0 z-50 justify-center flex items-center backdrop-blur-sm" @click="emit('cancel')">
        <Window @click.stop class="p-12 flex flex-col gap-4 w-200">
            <span class="mainHeader flex mb-10 justify-center">Produkt anlegen</span>
            <div class="flex gap-5 justify-between">
                <CustomInputField
                    v-model="itemName"
                    type="text"
                    label="Name"
                    name="itemName"
                    placeholder="Thunfisch Salat"
                    :error="errorItemName"
                    class="w-6/10"/>
                <CustomInputField
                    v-model="itemPrice"
                    type="number"
                    label="Preis"
                    name="itemPrice"
                    placeholder="15.80 €"
                    :error="errorItemPrice"
                    class="w-3/10"/>
            </div>
            <div class="flex gap-5 items-center justify-between">
                <TypeDropDown :options="options" v-model="itemType" class="w-3/10"/>
                <CustomInputField
                    v-model="itemCode"
                    type="text"
                    label="Code"
                    name="itemCode"
                    placeholder="SU01"
                    :error="errorItemCode"
                    class="w-3/10"/>
            </div>
            <div class="flex flex-col gap-2">
                <label for="itemDescription">Beschreibung</label>
                <textarea name="itemDescription" id="itemDescription" v-model="itemDescription" placeholder="Nach Art des Hauses, gemischter Blattsalat mit Zwiebel, Thunfisch & Balsamico Dressing" class="border border-main-500 h-30 rounded-lg p-3 hover:outline-1 hover:outline-main-500 focus-within:outline-2 focus-within:outline-main-500 focus-within:hover:outline-2"></textarea>
            </div>
            <CustomButton variant="submit" class="mt-5" @click="createItem()">anlegen</CustomButton>
        </Window>
    </div>
</template>