<script setup lang="ts">
    import { ref } from 'vue';

    import EditRestaurant from '@/components/Admin/Restaurants/EditRestaurant.vue';
    import DisplayRestaurant from './DisplayRestaurant.vue';

    interface Restaurant {
        id: number,
        name: string,
        street: string,
        addressAddition: string,
        city: string,
        zipcode: string,
        isActive: boolean,
        categories: string[],
    }

    const props = defineProps<{
        restaurant: Restaurant | null;
    }>();

    const showCreateRestaurant = ref<boolean>(false);

</script>

<template>
    <DisplayRestaurant v-if="restaurant && !showCreateRestaurant" :restaurant="restaurant" @editRestaurant="showCreateRestaurant = true"/>
    <EditRestaurant v-if="restaurant && showCreateRestaurant" :restaurant="restaurant" @goBack="showCreateRestaurant = false"/>
</template>