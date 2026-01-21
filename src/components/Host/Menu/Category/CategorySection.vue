<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import CustomButton from '@/components/General/CustomButton.vue';
    import CreateCategory from './CreateCategory.vue';
    import EditCategory from '@/components/Host/Menu/Category/EditCategory.vue';
    import { deleteCategory, getCategories } from '@/Services/category.service';
    import DeleteWindow from '@/components/General/DeleteWindow.vue';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import type { CategoryResponse } from '@/Types/category.types';

    const value = defineModel<number>();

    const props = defineProps<{
        restaurantId: number,
    }>();

    const emit = defineEmits<{
        (e: 'switch', category: CategoryResponse): void,
        (e: 'set', category: CategoryResponse | null): void,
    }>();
    
    const popupStore = usePopupStore();

    const categories = ref<CategoryResponse[]>([]);
    const currentCategory = ref<CategoryResponse | null>(null);

    const activeButton = ref<string>('');
    const showDelete = ref<string>('');

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

    const updateLocalCategory = (
        updatedCategory: CategoryResponse,
        categoryId: number
    ): void => {
        const index = categories.value.findIndex(category => category.id === categoryId);
        if (index !== -1) {
            categories.value[index] = updatedCategory;
            currentCategory.value = updatedCategory;
        };
    };

    const handleDeleteCategory = async (
        categoryId: number
    ): Promise<void> => {
        try {
            await deleteCategory(categoryId, props.restaurantId);
            popupStore.setSuccess('Kategorie wurde erfolgreich gelöscht.');
            categories.value = categories.value.filter(category => category.id !== categoryId);
            if (currentCategory.value && categories.value.length > 0 && currentCategory.value.id === categoryId)
                currentCategory.value = categories.value[0];
            else if(categories.value.length <= 0) {
                emit('set', null)
                activeButton.value = '';
                currentCategory.value = null;
            }
        } catch (error) {
            popupStore.setError('Löschung der Kategorie fehlgeschlagen.')
        }
    };

    const handleCreateCategory = (newCategory: CategoryResponse): void => {
        categories.value.push(newCategory);
        currentCategory.value = newCategory;
        value.value = newCategory.id;
        activeButton.value = '';
        emit('set', newCategory);
    };

    onMounted(async () => {
        if (props.restaurantId === -1)
            return;
        categories.value = await getCategories(props.restaurantId);
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
                    <button v-show="currentCategory" class="-translate-y-3" @click="activeButton = activeButton === 'edit' ? '' : 'edit'">
                        <img src="@/assets/svgs/editBlue.svg" alt="" class="max-w-7">
                    </button>
                </div>

                <CustomButton variant="gray" @click="activeButton = activeButton === 'create' ? '' : 'create'" class="gap-2">
                    <img src="@/assets/svgs/plusWhite.svg" alt="" class="max-w-5">
                    <span class="lg:text-lg">Kategorie hinzufügen</span>
                </CustomButton>

            </div>

            <CreateCategory
                v-if="activeButton === 'create'"
                :restaurantId="restaurantId"
                :lastCategoryPos="categories.length"
                @cancel="activeButton = ''"
                @success="handleCreateCategory($event)"/>
        </div>

        <div v-show="currentCategory" class="relative flex items-center">

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

        <EditCategory
            v-if="activeButton === 'edit' && currentCategory"
            :category="currentCategory"
            :restaurantId="restaurantId"
            @success="updateLocalCategory($event, currentCategory.id)"
            @cancel="activeButton = ''"
            @delete="showDelete = currentCategory.name"/>

        <DeleteWindow
            v-if="showDelete && currentCategory"
            @cancel="showDelete = ''"
            @delete="handleDeleteCategory(currentCategory.id); showDelete = ''">
            <div class="flex flex-col gap-4 justify-center items-center">
                <span>Möchtest du die Kategorie:</span>
                <span class="flex w-full justify-center text-xl font-medium">{{ currentCategory.name }}</span>
                <span>mit samt allen Items wirklich löschen?</span>
                <span class="text-gray-400">Dies kann nicht rückgängig gemacht werden.</span>
            </div>
        </DeleteWindow>

    </div>
</template>