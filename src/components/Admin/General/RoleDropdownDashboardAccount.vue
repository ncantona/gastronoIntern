<script setup lang="ts">
    import ErrorMsg from '@/components/General/ErrorMsg.vue';

    const value = defineModel<string>();
    const props = defineProps<{
        errorMsg: string,
    }>();

</script>

<template>
    <div class="flex flex-col gap-2">
        <select id="roles" name="roles" class="border rounded-xl p-3 w-full" v-model="value">
            <option value="">Bitte auswählen</option>
            <option value="ROLE_KITCHEN">Küche</option>
            <option value="ROLE_BAR">Bar</option>
        </select>
        <ErrorMsg v-show="errorMsg">
            {{ errorMsg }}
        </ErrorMsg>
    </div>
</template>
