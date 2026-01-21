<script setup lang="ts">
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { ref, watch } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import GearSVG from '@/assets/svgs/settingsBlack.svg';
    import type { CategoryRequest, CategoryResponse } from '@/Types/category.types';
import { updateCategory } from '@/Services/category.service';

    const props = defineProps<{
        category: CategoryResponse,
        restaurantId: number
    }>();

    const emit = defineEmits<{
        (e: 'success', category :CategoryResponse): void,
        (e: 'cancel'): void,
        (e: 'delete'): void
    }>();

    const popupStore = usePopupStore();

    const category = ref<CategoryRequest>({ ...props.category });

    watch(() => props.category, (newCategory) => {
        category.value = { ...newCategory };
    }, { deep: true });

    const handleUpdateCategory = async () => {

        try {
            const updatedCategory = await updateCategory(category.value, props.category.id, props.restaurantId);
            emit('success', updatedCategory);
            popupStore.setSuccess('Kategorie erfolgreich aktualisiert.');
        } catch {
            popupStore.setError('Kategorie aktualisieren fehlgeschlagen.');
        };

    }
</script>

<template>
    <div class="border-2 border-ownblue-500 rounded-xl p-5">

        <WindowHeader
            :img-src="GearSVG"
            img-alt="Ein Zahnrad"
            :showDelete=true
            @delete="emit('delete')">
            Kategorie bearbeiten
        </WindowHeader>

        <form @submit.prevent="handleUpdateCategory()">
            <CustomInputField
                v-model="category.name"
                type="text"
                label="Bezeichnung"
                name="categoryName"
                placeholder="z.B. Vorspeisen"/>

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