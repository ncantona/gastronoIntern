<script setup lang="ts">
    import CustomButton from '@/components/General/CustomButton.vue';

    interface RestaurantAccount {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
    };

    const value = defineModel<RestaurantAccount>();

</script>

<template>
    <div class="max-w-100 w-full h-full min-w-125 self-center flex flex-col gap-5">
        <div class="flex gap-4 flex-col">
            <span class="font-semibold">
                Login-ID
            </span>
            <span>
                {{ value?.loginId }}
            </span>
        </div>
        <div class="flex w-full">
            <div class="flex flex-col gap-4 w-7/10">
                <span class="font-semibold">
                    Vorname
                </span>
                <span>
                    {{ value?.firstName }}
                </span>
            </div>
            <div class="flex flex-col gap-4 w-3/10">
                <span class="font-semibold">
                    Nachname
                </span>
                <span>
                    {{ value?.lastName }}
                </span>
            </div>
        </div>
        <div class="flex gap-4 flex-col">
            <span class="font-semibold">
                Email
            </span>
            <span>
                {{ value?.email }}
            </span>
        </div>
        <div class="w-7/10 self-center mt-5">
            <CustomButton
                variant="delete"
                class="w-full">
                Account löschen
            </CustomButton>
        </div>
    </div>
</template>