<script setup lang="ts">
    import ErrorMsg from '@/components/General/ErrorMsg.vue';

    const value = defineModel<string |number>();

    const props = defineProps({
        label: String,
        name: String,
        required: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
        error: String,
    });

</script>

<template>
    <div class="flex flex-col gap-2">
        <span v-show="label?.length">
            <label
                :for="name">
                {{ label }}
            </label>
        </span>
        <input
            :type="type"
            :id="name"
            :name="name"
            :placeholder="placeholder"
            :required="required"
            class="border border-main-500 rounded-lg p-3 hover:outline-1 hover:outline-main-500 focus-within:outline-2 focus-within:outline-main-500 focus-within:hover:outline-2"
            v-model="value"
        />
        <ErrorMsg v-show="error">
            {{ error }}
        </ErrorMsg>
    </div>
</template>