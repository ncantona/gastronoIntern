<script setup lang="ts">
    import CustomButton from '@/components/General/CustomButton.vue';

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

    const value = defineModel<boolean>();
    
    const props = defineProps<{
        restaurant: Restaurant,
    }>();

    const emits = defineEmits(['confirmed', 'canceled']);

</script>

<template>
    <div v-if="value" class="z-100 fixed inset-0 flex items-center justify-center text-xl">
        <div class="self-center h-full items-center justify-center lg:h-auto flex flex-col gap-5 bg-white lg:rounded-lg p-5" @click.stop>
            <div
                class="max-w-100 w-full lg:min-w-125 justify-center flex flex-col gap-5 p-5">
                <span class="mainHeader mb-4">
                    Daten bestätigen
                </span>
                <div class="flex gap-4 flex-col">
                    <span class="font-semibold">
                        Restaurant Name
                    </span>
                    <span>
                        {{ props.restaurant.name }}
                    </span>
                </div>
                <div class="flex gap-5 w-full">
                    <div class="flex flex-col gap-4  w-7/10">
                        <span class="font-semibold">
                            Straße
                        </span>
                        <span>
                            {{ props.restaurant.street }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-4  w-3/10">
                        <span class="font-semibold">
                            Nr. / Zusatz
                        </span>
                        <span>
                            {{ props.restaurant.addressAddition }}
                        </span>
                    </div>
                </div>
                <div class="flex  gap-4 flex-col">
                    <span class="font-semibold">
                        Ort
                    </span>
                    <span>
                        {{ props.restaurant.city }}
                    </span>
                </div>
                <div class="flex gap-4 flex-col">
                    <span class="font-semibold">
                        Postleitzahl
                    </span>
                    <span>
                        {{ props.restaurant.zipcode }}
                    </span>
                </div>
                <div class="w-full">
                    <CustomButton
                        variant="editBlue"
                        class="mt-4 w-full"
                        @click="emits('confirmed')">
                        Bestätigen
                    </CustomButton>
                    <CustomButton
                        variant="cancel"
                        class="mt-4 w-full"
                        @click="emits('canceled')">
                        Abbrechen
                    </CustomButton>
                </div>
            </div>
        </div>
    </div>
</template>