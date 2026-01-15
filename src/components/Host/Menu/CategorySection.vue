<script setup lang="ts">
    import { useRestaurantItemsStore } from '@/stores/Restaurant/useRestaurantItemsStore';
    import { onMounted, ref } from 'vue';

    import CustomButton from '@/components/General/CustomButton.vue';
import CreateCategory from './CreateCategory.vue';

    interface CategoryResponse {
        id: number,
        name: string,
        position: number,
    }

    const value = defineModel<number>();

    const props = defineProps<{
        restaurantId: number,
    }>();

    const emit = defineEmits<{
        (e: 'switch', category: CategoryResponse): void,
        (e: 'set', category: CategoryResponse): void,
    }>();
    
    const restaurantItemStore = useRestaurantItemsStore();

    const categories = ref<CategoryResponse[]>([]);
    const currentCategory = ref<CategoryResponse | null>(null);

    const showCreateCategory = ref<boolean>(false);

    const scrollContainer = ref<HTMLDivElement | null>(null);
    const scrollAmount :number = 500;
    const showLeftButton = ref<boolean>(false);
    const showRightButton = ref<boolean>(true);

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
        if (props.restaurantId === -1)
            return;
        categories.value = await restaurantItemStore.loadCategories(props.restaurantId);
        currentCategory.value = categories.value[0] ?? null;
        value.value = currentCategory.value.id;
        emit('set', currentCategory.value);
        checkScroll();
    })
</script>

<template>
    <div class="mb-2.5 flex flex-col gap-5">
        <div class="flex flex-col gap-5">
            <div class="flex lg:flex-row flex-col gap-2 justify-between lg:items-center">

                <div class="flex gap-3 items-start">
                    <h3 class="text-xl font-medium">Kategorien</h3>
                    <button class="-translate-y-3">
                        <img src="@/assets/svgs/editBlue.svg" alt="" class="max-w-7">
                    </button>
                </div>

                <CustomButton variant="gray" @click="showCreateCategory = !showCreateCategory" class="gap-2">
                    <img src="@/assets/svgs/plusWhite.svg" alt="" class="max-w-5">
                    <span class="lg:text-lg">Kategorie hinzufügen</span>
                </CustomButton>

            </div>
            <CreateCategory v-if="showCreateCategory" :restaurantId="restaurantId" :lastCategoryPos="categories.length" @cancel="showCreateCategory = false" @success="categories.push($event); showCreateCategory = false"/>
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
                    :class="currentCategory?.name === category.name
                    ? 'bg-ownblue-500 text-white'
                    : 'bg-white hover:bg-gray-100'"
                    @click="currentCategory = category; emit('switch', category)">
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
</template>