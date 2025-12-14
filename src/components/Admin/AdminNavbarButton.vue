<script setup lang="ts">

    const props = defineProps<{
        linkTo: string;
    }>();
</script>


<template>
    <RouterLink
        :to="{ name: linkTo}"
        class="flex items-center p-3 mb-1 rounded-l-lg text-reallyDarkBrown hover:bg-[rgba(141,110,99,0.3)] transition-colors"
        active-class="bg-brown08 hover:bg-brown08 text-white">
        <slot>Navbar Button</slot>
    </RouterLink>
</template>