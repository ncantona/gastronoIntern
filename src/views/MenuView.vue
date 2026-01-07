<script setup lang="ts">
    import Window from '@/components/General/Window.vue';
    import CreateItemWindowv2 from '@/components/Host/Menu/CreateItemWindowv2.vue';
    import CreateItemWindow from '@/components/Host/Menu/CreateItemWindow.vue';
    import { ref, computed, onMounted } from 'vue'
    import draggable from 'vuedraggable'
    import { useRestaurantItemsStore } from '@/stores/Restaurant/useRestaurantItemsStore';
    import CustomButton from '@/components/General/CustomButton.vue';
    import EditItemWindowv2 from '@/components/Host/Menu/EditItemWindowv2.vue';
    import BeerSVG from '@/components/Svgs/BeerSVG.vue';
    import BurgerSVG from '@/components/Svgs/BurgerSVG.vue';
import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';

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
        categoryId: number;
        position: number;
        code: string;
        itemType: ItemType;
        price: number;
        isAvailable: boolean;
    }

    const restaurantItemsStore = useRestaurantItemsStore();

    const currentCategory = ref<Category>({
        id: 1,
        name: 'Getränke',
        position: 1,
    })

    const displayedItems = computed(() =>
    restaurantItemsStore.items
        .filter(item => item.categoryId === currentCategory.value.id)
        .sort((a, b) => a.position - b.position)
    )

    // Drag & Drop innerhalb der Kategorie
    function onDragUpdate({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
        const itemsInCat = restaurantItemsStore.items
            .filter(i => i.categoryId === currentCategory.value.id)
            .sort((a, b) => a.position - b.position)

        const moved = itemsInCat.splice(oldIndex, 1)[0]
        itemsInCat.splice(newIndex, 0, moved)

        // Positionen aktualisieren
        itemsInCat.forEach((item, idx) => (item.position = idx + 1))

        // Original-Liste updaten
        restaurantItemsStore.items = [
                ...restaurantItemsStore.items.filter(i => i.categoryId !== currentCategory.value.id),
                ...itemsInCat
            ]
    }

    const categories = ref<Category[]>([
        { id: 1, name: 'Getränke', position: 1 },
        { id: 2, name: 'Salate', position: 2 },
    ])
    
    const showAddItem = ref<boolean>(false);
    const showEditItem = ref<boolean>(false);
    const itemToEdit = ref<Item>();

    const deleteItem = async (restaurantId :number, itemId :number) => {
        restaurantItemsStore.deleteItemById(restaurantId, itemId);
    }

    const scrollContainer = ref<HTMLDivElement | null>(null);

    const scrollAmount = 500;

    const showLeftButton = ref(false);
    const showRightButton = ref(true);

    const scrollLeft = (): void => {
        scrollContainer.value?.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        })
    };

    const scrollRight = (): void => {
        scrollContainer.value?.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        })
    };

    const checkScroll = (): void => {

        if (!scrollContainer.value)
            return;

        const scrollLeftPos = scrollContainer.value.scrollLeft;
        const maxScroll = scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth;

        showLeftButton.value = scrollLeftPos > 0;
        showRightButton.value = scrollLeftPos < maxScroll;
    }

    onMounted(async () => {
        const restaurantStore = useRestaurantStore();
        const restaurant = restaurantStore.restaurant;
        if (!restaurant)
            return;
        try {
            restaurantItemsStore.loadItems(restaurant.id);
        } catch {
            
        }
        checkScroll();

    })

</script>

<template>
    <div class="p-6">
        <!-- Header -->
        <div class="p-8 px-0">
            <h1 class="text-4xl font-bold text-slate-900 mb-2">Speisekarte verwalten</h1>
            <p class="text-slate-600">Verwalte deine Speisekarte</p>
        </div>
        <Window class="flex flex-col p-12 gap-5 min-h-175">
            <div class="flex justify-between">
                <div class="flex flex-col gap-2 mb-5">
                    <h2 class="text-2xl font-semibold">Meine Speisekarte</h2>
                    <div class="flex text-gray-500">
                        <span>{{ restaurantItemsStore.items.filter(item => item.itemType === 'MEAL').length }} {{ restaurantItemsStore.items.filter(item => item.itemType === 'MEAL').length === 1 ? 'Gericht' : 'Gerichte'}}</span>
                        <span class="whitespace-break-spaces"> / </span>
                        <span>{{ restaurantItemsStore.items.filter(item => item.itemType === 'BEVERAGE').length }} {{ restaurantItemsStore.items.filter(item => item.itemType === 'BEVERAGE').length === 1 ? 'Getränk' : 'Getränke'}}</span>
                    </div>
                </div>
                <div class="text-gray-500 lg:flex hidden flex-col">
                    <div class="flex items-center">
                        <img src="@/assets/svgs/hamburgerIcon.svg" alt="" class="max-w-6">
                        <span class="whitespace-break-spaces"> = Gericht</span>
                    </div>
                    <div class="flex items-center">
                        <img src="@/assets/svgs/cocktailIcon.svg" alt="" class="max-w-6">
                        <span class="whitespace-break-spaces"> = Getränk</span>
                    </div>
                </div>
            </div>

            <div class="mb-2.5 flex flex-col gap-5">
                <div class="flex lg:flex-row flex-col gap-2 justify-between lg:items-center">
                    <span class="text-xl font-medium">Kategorien</span>
                    <CustomButton variant="gray" @click="" class="gap-2">
                        <img src="@/assets/svgs/plusWhite.svg" alt="" class="max-w-5">
                        <span class="lg:text-lg">Kategorie hinzufügen</span>
                    </CustomButton>
                </div>
                <div class="relative flex items-center">

                    <button
                        v-if="showLeftButton"
                        @click="scrollLeft"
                        class="absolute left-0 z-10 h-full px-3
                                bg-gradient-to-r text-2xl from-white to-transparent
                                lg:flex hidden items-center justify-center">
                        ◀
                    </button>

                    <div
                        ref="scrollContainer"
                        @scroll="checkScroll"
                        class="flex gap-3 py-3
                            lg:overflow-hidden overflow-auto">
                        <button
                            v-for="category in categories"
                            :key="category.name"
                            class="rounded-xl shadow-sm p-3 border border-gray-200 px-5
                                transition-all duration-200 ease-in-out
                                flex items-center justify-center lg:text-lg
                                whitespace-nowrap"
                            :class="currentCategory.name === category.name
                            ? 'bg-[rgb(37,99,235)] text-white'
                            : 'bg-white hover:bg-gray-100'"
                            @click="currentCategory = category">

                            {{ category.name }}
                        </button>
                    </div>

                    <button
                        v-if="showRightButton"
                        @click="scrollRight"
                        class="absolute right-0 z-10 h-full px-3
                                bg-gradient-to-l text-2xl from-white to-transparent
                                lg:flex hidden items-center justify-center">
                        ▶
                    </button>

                </div>
            </div>

            <div class="w-full">
                <div class="flex w-full justify-end mb-5">
                    <CustomButton v-show="!showAddItem" variant="editBlue" @click="showAddItem = true" class="gap-2 w-full">
                        <img src="@/assets/svgs/plusWhite.svg" alt="" class="max-w-5">
                        Neues Gericht / Getränk hinzufügen
                    </CustomButton>
                </div>
                <CreateItemWindowv2 v-if="showAddItem" :categoryId="currentCategory.id" :categoryName="currentCategory.name" :categoryPosition="currentCategory.position" :itemPosition="displayedItems.length" @cancel="showAddItem = false" @success="showAddItem = false"/>
                <div class="shadow-lg p-4 rounded-xl overflow-x-auto h-150">
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
                                            <span class="text-[rgb(37,99,235)]">€{{ element.price.toFixed(2) }}</span>
                                        </div>
                                        <div class="flex relative justify-between h-10">
                                            <span v-if="element.description" class="max-w-175 text-gray-500 text-sm line-clamp-2">{{ element.description }}</span>
                                            <div class="absolute right-0 gap-2 self-end justify-end">
                                                <button @click="itemToEdit = element; showEditItem = true">
                                                    <img src="@/assets/svgs/editBlue.svg" alt="" class="max-w-6">
                                                </button>
                                                <button @click="deleteItem(element.restaurantId, element.id)">
                                                    <img src="@/assets/svgs/trashRed.svg" alt="" class="max-w-6">
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </draggable>
                    <EditItemWindowv2 v-if="showEditItem && itemToEdit" :item="itemToEdit" @cancel="showEditItem = false" @success="showEditItem = false"/>
                    <div v-show="displayedItems.length === 0 && !showAddItem" class="text-gray-500 flex text-center flex-col justify-center items-center h-full">
                        <span class="text-lg lg:block hidden">
                            Noch keine Gerichte / Getränke vorhanden
                        </span>
                        <span>
                            Füge dein erstes Gericht oder dein erstes Getränk hinzu!
                        </span>
                    </div>
                </div>
            </div>
        </Window>
    </div>
</template>