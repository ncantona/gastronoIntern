<script setup lang="ts">
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import InfoPart from '@/components/General/InfoPart.vue';
    import Window from '@/components/General/Window.vue';

    interface RestaurantAccount {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
        restaurantId: number,
    };

    const props = defineProps<{
        host: RestaurantAccount,
    }>();

    const emit = defineEmits(['edit', 'delete']);

    const fullName = props.host.firstName + ' ' + props.host.lastName;

</script>

<template>
    <Window class="p-12">

        <WindowHeader
            :show-edit="true"
            :show-delete="true"
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