<script setup lang="ts">
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import PlusInCircleSVG from '@/assets/svgs/plusBlack.svg';
import { createCategory } from '@/Services/category.service';

    interface CategoryRequest {
        name: string,
        position: number,
    }

    interface CategoryResponse {
        id: number,
        name: string,
        position: number,
    }

    const props = defineProps<{
        restaurantId: number,
        lastCategoryPos: number,
    }>();

    const emit = defineEmits<{
        (e: 'success', category :CategoryResponse): void,
        (e: 'cancel'): void,
    }>();

    const popupStore = usePopupStore();

    const categoryName = ref<string>('');
    const categoryError = ref<string>('');

    const handleCreateCategory = async () => {
        const categoryRequest = <CategoryRequest> {
            name: categoryName.value,
            position: props.lastCategoryPos + 1,
        }
        try {
            const newCategory = await createCategory(categoryRequest, props.restaurantId);
            emit('success', newCategory);
            popupStore.setSuccess('Kategorie erfolgreich angelegt.')
        } catch {
            popupStore.setError('Kategorie anlegen fehlgeschlagen.')
        }
    }
</script>

<template>
    <div class="border-2 border-ownblue-500 rounded-xl p-5">

        <WindowHeader
            :img-src="PlusInCircleSVG"
            img-alt="Ein Pluszeichen in einem Kreis">
            Kategorie anlegen
        </WindowHeader>

        <form @submit.prevent="handleCreateCategory()">
            <CustomInputField
                        v-model="categoryName"
                        type="text"
                        label="Bezeichnung"
                        name="categoryName"
                        placeholder="z.B. Vorspeisen"
                        :error="categoryError"/>

            <div class="flex gap-5">

                <CustomButton
                    variant="editBlue"
                    class="mt-4 w-full">
                    Speichern
                </CustomButton>

                <CustomButton
                    type="button"
                    @click="emit('cancel')"
                    variant="cancel"
                    class="mt-4 w-full">
                    Abbrechen
                </CustomButton>

            </div>
        </form>
    </div>
</template>