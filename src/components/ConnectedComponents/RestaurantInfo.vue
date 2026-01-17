<script setup lang="ts">
    import type { RestaurantResponse } from '@/Types/restaurant.types';
    import { ref } from 'vue';

    import WindowHeader from '@/components/General/WindowHeader.vue';
    import InfoPart from '@/components/General/InfoPart.vue';
    import Window from '@/components/General/Window.vue';

    const props = defineProps<{
        restaurant: RestaurantResponse,
        showEdit?: boolean,
    }>();

    const emit = defineEmits(['edit']);

    const addressFirstPart = ref<string>(props.restaurant.street + (props.restaurant.addressAddition ? ' ' + props.restaurant.addressAddition : '') + ',');
    const addressSecondPart = ref<string>(props.restaurant.zipcode + ' ' + props.restaurant.city)

</script>

<template>
    <Window class="p-12">

        <WindowHeader
            :showEdit="showEdit"
            @edit="emit('edit')">
            Restaurant-Informationen
        </WindowHeader>

        <div class="space-y-6">

            <InfoPart
                label="Restaurant Name"
                :lines="[restaurant.name]"/>

            <InfoPart
                label='Adresse'
                :lines="[addressFirstPart, addressSecondPart]"
                :show-seperator="false"/>

        </div>
    </Window>
</template>