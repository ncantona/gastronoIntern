<script setup lang="ts">
    import { ref } from 'vue';

    import CreateHost from './CreateHost.vue';
    import EditHost from './EditHost.vue';
import DisplayHost from './DisplayHost.vue';

    const props = defineProps<{
        restaurantId: number;
    }>();

    interface RestaurantAccount {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
    };

    const accounts = ref<RestaurantAccount[]>([
        {
            id: "1",
            loginId: 'ID-Küche',
            firstName: '',
            lastName: '',
            email: '',
            roles: ['ROLE_KITCHEN'],
        },
        {
            id: "2",
            loginId: 'ID-Bar',
            firstName: '',
            lastName: '',
            email: '',
            roles: ['ROLE_BAR'],
        },
        {
            id: "3",
            loginId: 'ID-Host',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john-doe@gmail.com',
            roles: ['ROLE_HOST'],
        },
        {
            id: "4",
            loginId: 'ID-Restaurant',
            firstName: '',
            lastName: '',
            email: '',
            roles: ['ROLE_RESTAURANT'],
        },
    ]);

    const deleteHost = async () => {
        hostAccount.value = null;
    }

    const hostAccount = ref<RestaurantAccount | null>(accounts.value.find(account => account.roles.includes('ROLE_HOST')) as RestaurantAccount ?? null);
    
    const showEditHost = ref<boolean>(false);
</script>

<template>
    <CreateHost :restaurantId="restaurantId" v-if="!hostAccount"/>
    <EditHost :host="hostAccount" :restaurantId="restaurantId" v-if="hostAccount && showEditHost" @goBack="showEditHost = false"/>
    <DisplayHost :host="hostAccount" v-if="hostAccount && !showEditHost" @editHost="showEditHost = true" @deleteHost="deleteHost()"/>
</template>