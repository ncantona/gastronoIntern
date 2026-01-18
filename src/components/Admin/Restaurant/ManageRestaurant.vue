<script setup lang="ts">
    import type { RestaurantResponse } from '@/Types/restaurant.types';
    import { ref } from 'vue';

    import RestaurantInfo from '@/components/ConnectedComponents/RestaurantInfo.vue';
    import EditRestaurant from '@/components/Admin/Restaurant/EditRestaurant.vue';

    const value = defineModel<RestaurantResponse | null>();

    const showEditRestaurant = ref<boolean>(false);

</script>

<template>

    <RestaurantInfo
        v-if="value && !showEditRestaurant"
        :restaurant="value"
        :showEdit="true"
        @edit="showEditRestaurant = true"/>

    <EditRestaurant
        v-if="value && showEditRestaurant"
        :restaurant="value"
        @success="showEditRestaurant = false, value = $event"
        @cancel="showEditRestaurant = false"/>

</template>