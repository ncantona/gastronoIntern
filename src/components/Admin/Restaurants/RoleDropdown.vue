<script setup lang="ts">

    type Role = 'ROLE_KITCHEN' | 'ROLE_HOST' | 'ROLE_BAR' | 'ROLE_RESTAURANT' | '';

    const value = defineModel<Role>();

</script>

<template>
    <select id="roles" name="roles" class="border rounded-xl p-3 w-full max-w-sm" v-model="value">
        <option value="">Bitte auswählen</option>
        <option value="ROLE_RESTAURANT">Restaurant</option>
        <option value="ROLE_KITCHEN">Küche</option>
        <option value="ROLE_BAR">Bar</option>
    </select>
</template>
