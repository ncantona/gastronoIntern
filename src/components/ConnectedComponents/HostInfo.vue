<script setup lang="ts">
    import type { RestaurantAccountResponse } from '@/Types/user.types';
    
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import InfoPart from '@/components/General/InfoPart.vue';
    import Window from '@/components/General/Window.vue';

    const props = defineProps<{
        host: RestaurantAccountResponse,
        showEdit?: boolean,
        showDelete?: boolean,
    }>();

    const emit = defineEmits(['edit', 'delete']);

    const fullName = props.host.firstName + ' ' + props.host.lastName;

</script>

<template>
    <Window class="p-12">

        <WindowHeader
            :show-edit="showEdit"
            :show-delete="showDelete"
            @edit="emit('edit')"
            @delete="emit('delete')">
            Host-Informationen
        </WindowHeader>

        <div class="space-y-6">

            <InfoPart
                label="Login-ID"
                :lines="[host.loginId]"/>
            
            <InfoPart
                label="Name"
                :lines="[fullName]"/>

            <InfoPart
                label="E-Mail-Adresse"
                :lines="[host.email]"
                :show-seperator="false"/>

        </div>
    </Window>
</template>