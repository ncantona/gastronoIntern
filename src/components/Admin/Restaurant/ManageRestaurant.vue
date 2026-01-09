<script setup lang="ts">
    import { ref } from 'vue';

    import EditRestaurant from '@/components/Admin/Restaurant/EditRestaurant.vue';
    import RestaurantInfo from '@/components/Admin/Restaurant/RestaurantInfo.vue';

    interface RestaurantResponse {
        id: number,
        name: string,
        street: string,
        addressAddition: string,
        zipcode: string,
        city: string,
        isActive: boolean,
        createdAt: string,
    };

    const value = defineModel<RestaurantResponse | null>();

    const showEditRestaurant = ref<boolean>(false);

</script>

<template>

    <RestaurantInfo
        v-if="value && !showEditRestaurant"
        :restaurant="value"
        @edit="showEditRestaurant = true"/>

    <EditRestaurant
        v-if="value && showEditRestaurant"
        :restaurant="value"
        @success="showEditRestaurant = false"
        @cancel="showEditRestaurant = false"/>

</template>