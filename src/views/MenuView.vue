<script setup lang="ts">
    import Window from '@/components/General/Window.vue';
    import CreateItemWindow from '@/components/Host/Menu/CreateItemWindow.vue';
    import { ref, computed } from 'vue'
    import draggable from 'vuedraggable'
    import { useRestaurantItemsStore } from '@/stores/Restaurant/useRestaurantItemsStore';
    import CustomButton from '@/components/General/CustomButton.vue';
    import EditItemWindow from '@/components/Host/Menu/EditItemWindow.vue';

    type ItemType = 'BEVERAGE' | 'MEAL';

    interface Category {
        id: number,
        name: string,
        position: number,
    }

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
        isAvailable: boolean;
    }

    const restaurantItemsStore = useRestaurantItemsStore();

    const currentCategory = ref<Category>({
        id: 1,
        name: 'Salate',
        position: 1,
    })

    const displayedItems = computed(() =>
    restaurantItemsStore.items
        .filter(item => item.categoryName === currentCategory.value.name)
        .sort((a, b) => a.position - b.position)
    )

    // Drag & Drop innerhalb der Kategorie
    function onDragUpdate({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
        const itemsInCat = restaurantItemsStore.items
            .filter(i => i.categoryName === currentCategory.value.name)
            .sort((a, b) => a.position - b.position)

        const moved = itemsInCat.splice(oldIndex, 1)[0]
        itemsInCat.splice(newIndex, 0, moved)

        // Positionen aktualisieren
        itemsInCat.forEach((item, idx) => (item.position = idx + 1))

        // Original-Liste updaten
        restaurantItemsStore.items = [
                ...restaurantItemsStore.items.filter(i => i.categoryName !== currentCategory.value.name),
                ...itemsInCat
            ]
    }

    const categories = ref<Category[]>([
        {
            id: 1,
            name: 'Salate',
            position: 1,
        },
        {
            id: 2,
            name: 'Vorspeisen',
            position: 2,
        }
    ])
    
    const showAddItem = ref<boolean>(false);
    const showEditItem = ref<boolean>(false);
    const itemToEdit = ref<Item>();

    const deleteItem = async (restaurantId :number, itemId :number) => {
        restaurantItemsStore.deleteItemById(restaurantId, itemId);
    }
</script>

<template>
    <div class="flex flex-col">
        <span class="m-5 text-2xl font-medium">Meine Speisekarte</span>
<!--         <Window class="w-5/20 sticky h-fit top-5">
            <span class="flex justify-center mb-10 text-lg font-medium">Kategorien</span>
            <div class="flex flex-col mb-5">
                <CustomButton class="mb-10" variant="submit">
                    Kategorie hinzufügen
                </CustomButton>
                <button v-for="category in categories"
                    @click="currentCategory = category"
                    class="border-b border-b-gray-200/80 p-4 hover:bg-gray-100 -mx-5">
                    {{ category.name }}
                </button>
            </div>
        </Window> -->
        <Window class="w-full p-12">
            <div class="flex w-full justify-end mb-10">
                <CustomButton variant="submit" @click="showAddItem = true">
                    Produkt hinzufügen
                </CustomButton>
            </div>

            <div class="grid mb-2 items-center gap-3 border-b border-gray-200 pb-3
                                grid-cols-[2.2rem_3rem_minmax(10rem,30rem)_5rem_5rem_4rem_1fr] font-medium">
                <span class="col-start-2">Code</span>
                <span class="col-start-3">Bezeichnung</span>
                <span class="col-start-4 text-right">Preis</span>
            </div>

            <draggable
                :list="displayedItems"
                item-key="id"
                handle=".drag"
                ghost-class="opacity-30"
                chosen-class="bg-gray-100"
                drag-class="opacity-90"
                @update="onDragUpdate">
                <template #item="{ element }">
                    <div class="grid mb-2 items-center gap-3 min-h-32 border-b border-gray-200 pb-3
                                grid-cols-[2.2rem_3rem_minmax(10rem,30rem)_5rem_5rem_4rem_1fr]">
                        
                        <div class="bg-gray-200 rounded-l-2xl flex items-center px-3 py-3 drag cursor-grab">
                            ⠿
                        </div>

                        <span>{{ element.code }}</span>

                        <div class="flex flex-col min-w-0">
                            <span class="font-medium truncate">{{ element.name }}</span>
                            <span
                                v-if="element.description"
                                class="text-gray-500 text-sm truncate">
                                {{ element.description }}
                            </span>
                        </div>

                        
                        <span class="text-right font-medium">{{ element.price.toFixed(2) }}</span>
                        
                        <div class="justify-end flex gap-1">
                            <img v-show="element.itemType === 'MEAL'" src="@/assets/svgs/burger.svg" alt="" class="max-w-6">
                            <img v-show="element.itemType === 'BEVERAGE'" src="@/assets/svgs/beerBlack.svg" alt="" class="max-w-6">
                            <img v-show="element.isActive" src="@/assets/svgs/activePulseGreen.svg" alt="Active Pulse Icon">
                            <img v-show="!element.isActive" src="@/assets/svgs/activePulseRed.svg" alt="Active Pulse Icon">
                        </div>
                        <div class="flex items-center gap-1 col-start-7">
                            <button @click="itemToEdit = element; showEditItem = true">
                                <img src="@/assets/svgs/editBlue.svg" alt="" class="max-w-6">
                            </button>
                            <button @click="deleteItem(element.restaurantId, element.id)">
                                <img src="@/assets/svgs/trashRed.svg" alt="" class="max-w-6">
                            </button>
                        </div>
                    </div>
                </template>
            </draggable>
            <span v-show="displayedItems.length === 0" class="text-gray-500 mt-15 flex justify-center items-center">Noch keine Produkte in dieser Kategorie vorhanden.</span>
            <CreateItemWindow v-if="showAddItem" :categoryName="currentCategory.name" :categoryPosition="currentCategory.position" :itemPosition="displayedItems.length" @cancel="showAddItem = false" @success="showAddItem = false"/>
            <EditItemWindow v-if="showEditItem && itemToEdit" :item="itemToEdit" @cancel="showEditItem = false" @success="showEditItem = false"/>
        </Window>
    </div>
</template>