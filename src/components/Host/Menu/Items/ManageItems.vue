<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'
    
    import CreateItem from '@/components/Host/Menu/Items/CreateItem.vue';
    import draggable from 'vuedraggable'
    import CustomButton from '@/components/General/CustomButton.vue';
    import type { CategoryResponse } from '@/Types/category.types';
    import type { ItemResponse } from '@/Types/item.types';
    import EditItem from './EditItem.vue';
    import { deleteItem, getAllItems, updateItem } from '@/Services/item.service';
import { usePopupStore } from '@/stores/General/usePopupStore';

    const props = defineProps<{
        currentCategory: CategoryResponse | null,
        restaurantId: number
    }>();

    const value = defineModel<{beverage: number, meals: number}>();

    const popupStore = usePopupStore();
    const restaurantItems = ref<ItemResponse[]>([]);

    const displayedItems = computed(() =>
        restaurantItems.value
            .filter(item => item.categoryId === props.currentCategory?.id)
            .sort((a, b) => a.position - b.position)
    )

    watch(restaurantItems, (newItems) => {
        value.value = {
            beverage: newItems.filter(item => item.itemType === 'BEVERAGE').length,
            meals: newItems.filter(item => item.itemType === 'MEAL').length
        };
    }, { deep: true });

    async function onDragUpdate({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
        const itemsInCat = restaurantItems.value
            .filter(i => i.categoryId === props.currentCategory?.id)
            .sort((a, b) => a.position - b.position);
        const moved = itemsInCat.splice(oldIndex, 1)[0];

        itemsInCat.splice(newIndex, 0, moved);
        itemsInCat.forEach((item, idx) => (item.position = idx + 1));
        restaurantItems.value = [...restaurantItems.value.filter(i => i.categoryId !== props.currentCategory?.id), ...itemsInCat];

        try {
            await Promise.all(
                itemsInCat.map(item => 
                    updateItem(
                        {
                            code: item.code,
                            name: item.name,
                            itemType: item.itemType,
                            position: item.position,
                            categoryId: item.categoryId,
                            description: item.description,
                            price: item.price,
                            isAvailable: item.isAvailable
                        },
                        item.id,
                        props.restaurantId
                    )
                )
            )
        } catch (error) {
            popupStore.setError('Fehler beim Aktualisieren der Position.');
        }
    }
    
    const showAddItem = ref<boolean>(false);
    const showEditItem = ref<boolean>(false);
    const itemToEdit = ref<ItemResponse>();

    const handleDeleteItem = async (
        restaurantId :number,
        itemId :number
    ): Promise<void> => {
        try {
            await deleteItem(itemId, restaurantId);
            restaurantItems.value = restaurantItems.value.filter(item => item.id !== itemId);
        } catch (error) {
            
        }
    };

    const updateLocalItem = (
        updatedItem: ItemResponse
    ): void => {
        const index = restaurantItems.value.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            restaurantItems.value[index] = updatedItem;
        };
    }

    onMounted(async (
    ): Promise<void> => {
        restaurantItems.value = await getAllItems(props.restaurantId);
    });

</script>

<template>
    <div class="w-full">
        <div v-if="currentCategory" class="flex w-full justify-end mb-5">
            <CustomButton v-show="!showAddItem" variant="editBlue" @click="showAddItem = true; showEditItem = false" class="gap-2 w-full">
                <img src="@/assets/svgs/plusWhite.svg" alt="" class="max-w-5">
                Neues Gericht / Getränk hinzufügen
            </CustomButton>
        </div>
        <CreateItem
            v-if="showAddItem && currentCategory"
            :categoryId="currentCategory.id"
            :itemPosition="displayedItems.length"
            @cancel="showAddItem = false"
            @success="showAddItem = false; restaurantItems.push($event)"/>
        <div v-show="(!showEditItem && !showAddItem)" class="shadow-lg p-4 rounded-xl overflow-x-auto h-150">
            <draggable
                :list="displayedItems"
                item-key="id"
                handle=".drag"
                ghost-class="opacity-30"
                chosen-class="bg-gray-100"
                drag-class="opacity-90"
                @update="onDragUpdate">
                <template #item="{ element }">
                    <div class="shadow-[0_0_8px_rgba(0,0,0,0.1)] rounded-xl grid mb-2 items-center min-h-32 maax-h-32 border-b border-gray-200
                                grid-cols-[2.4rem_minmax(0,1fr)] hover:bg-gray-50">
                        
                        <div class="bg-gray-200 rounded-l-xl h-full flex items-center px-3 py-3 drag cursor-grab">
                            ⠿
                        </div>
                        <div class="flex h-full">
                            <div class="w-35">
                                <span class="flex justify-center p-5 text-xl">{{ element.code }}</span>
                                <div class="flex gap-2 justify-center w-full items-center">
                                    <img v-show="element.isAvailable" src="@/assets/svgs/activePulseGreen.svg" alt="Active Pulse Icon" class="max-w-6">
                                    <img v-show="!element.isAvailable" src="@/assets/svgs/activePulseRed.svg" alt="Active Pulse Icon" class="max-w-6">
                                    <img v-show="element.itemType === 'MEAL'" src="@/assets/svgs/hamburgerIcon.svg" alt="" class="max-w-6">
                                    <img v-show="element.itemType === 'BEVERAGE'" src="@/assets/svgs/cocktailIcon.svg" alt="" class="max-w-6">
                                </div>
                            </div>
                            <div class="flex flex-col h-full p-5 pl-0 gap-2 w-full">
                                <div class="font-medium text-xl flex justify-between gap-2">
                                    <span class="truncate max-w-200">{{ element.name }}</span>
                                    <span class="text-ownblue-500">€{{ element.price.toFixed(2) }}</span>
                                </div>
                                <div class="flex relative justify-between h-10">
                                    <span v-if="element.description" class="max-w-175 text-gray-500 text-sm line-clamp-2">{{ element.description }}</span>
                                    <div class="absolute right-0 gap-2 flex self-end justify-end">
                                        <button @click="itemToEdit = element; showEditItem = true; showAddItem = false">
                                            <img src="@/assets/svgs/editBlue.svg" alt="" class="max-w-6">
                                        </button>
                                        <button @click="handleDeleteItem(element.restaurantId, element.id)">
                                            <img src="@/assets/svgs/trashRed.svg" alt="" class="max-w-6">
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>

            <div v-show="currentCategory && displayedItems.length === 0 && !showAddItem" class="text-gray-500 flex text-center flex-col justify-center items-center h-full">
                <span class="text-lg lg:block hidden">
                    Noch keine Gerichte / Getränke vorhanden
                </span>
                <span>
                    Füge dein erstes Gericht oder dein erstes Getränk hinzu!
                </span>
            </div>

            <div v-show="!currentCategory" class="text-gray-500 flex text-center flex-col justify-center items-center h-full">
                <span class="text-lg lg:block hidden">
                    Noch keine Kategorien vorhanden
                </span>
                <span>
                    Füge deine erste Kategorie hinzu um Gerichte / Getränke anzulegen!
                </span>
            </div>
        </div>
        <EditItem
            v-if="showEditItem && itemToEdit"
            :item="itemToEdit"
            @cancel="showEditItem = false"
            @success="showEditItem = false; updateLocalItem($event)"/>
    </div>
</template>