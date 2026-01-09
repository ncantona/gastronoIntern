<script setup lang="ts">
    import { useAdminRestaurantStore } from '@/stores/Admin/useAdminRestaurantStore';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { onMounted, ref } from 'vue';

    import CreateHost from '@/components/Admin/General/CreateHost.vue';
    import EditHost from '@/components/Admin/General/EditHost.vue';
    import HostInfo from '@/components/Admin/General/HostInfo.vue';

    const props = defineProps<{
        restaurantId: number;
    }>();

    interface RestaurantAccountResponse {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
        restaurantId: number,
    };

    const adminRestaurantStore = useAdminRestaurantStore();
    const popupStore = usePopupStore();

    const hostAccount = ref<RestaurantAccountResponse | null>();

    const deleteHost = async () => {
        if (!hostAccount.value)
            return;

        try {
            adminRestaurantStore.deleteRestaurantHost(hostAccount.value.id);
            popupStore.setSuccess('Host wurde erfolgreich gelöscht.');
            hostAccount.value = null;
        } catch {
            popupStore.setError('Löschung des Host fehlgeschlagen.');
        }
    }

    const showEditHost = ref<boolean>(false);

    onMounted(async () => {
        hostAccount.value = await adminRestaurantStore.getRestaurantHost(props.restaurantId);
    });

</script>

<template>

    <HostInfo
        v-if="hostAccount && !showEditHost"
        :host="hostAccount"
        @edit="showEditHost = true"
        @delete="deleteHost"/>

    <EditHost
        v-if="hostAccount && showEditHost"
        :hostAccount="hostAccount"
        @success="showEditHost = false; hostAccount = $event"
        @cancel="showEditHost = false"/>

    <CreateHost
        v-if="!hostAccount"
        :restaurantId="restaurantId"
        @success="hostAccount = $event"/>

</template>