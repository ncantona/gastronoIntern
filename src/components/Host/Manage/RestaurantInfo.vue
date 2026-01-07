<script setup lang="ts">
    import Window from '@/components/General/Window.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import { ref } from 'vue';

    interface Restaurant {
        id: number;
        name: string;
        street: string;
        addressAddition?: string;
        city: string;
        zipcode: string;
        isActive: boolean;
    }

    const props = defineProps<{
        restaurant: Restaurant;
    }>();

    const emit = defineEmits(['edit']);

    const addressFirstPart = ref(props.restaurant.street || '' + (props.restaurant.addressAddition ? ' ' + props.restaurant.addressAddition : '') + ',');
    const addressSecondPart = ref(props.restaurant.zipcode + ' ' + props.restaurant.city);

</script>

<template>
    <Window class="p-12">
        <h2 class="text-2xl font-semibold mb-6">Restaurant-Informationen</h2>
        <div class="space-y-6">
            <div class="border-b border-slate-200 pb-4">
                <label class="text-sm text-slate-500 font-medium">Restaurant Name</label>
                <p class="text-lg text-slate-900 mt-1">{{ restaurant.name }}</p>
            </div>

            <div>
                <label class="text-sm text-slate-500 font-medium">Adresse</label>
                <p class="text-lg text-slate-900 mt-1">{{ addressFirstPart }}</p>
                <p class="text-lg text-slate-900 mt-1">{{ addressSecondPart }}</p>
            </div>
        </div>
    </Window>
</template>
