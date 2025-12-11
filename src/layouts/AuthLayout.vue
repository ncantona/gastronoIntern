<script setup lang="ts">

import Footer from '@/components/Homepage/Footer.vue';
import BaseNavbar from '@/components/Homepage/BaseNavbar.vue';

</script>

<template>
    <div class="min-h-screen w-full">
        <BaseNavbar class="lg:mb-20"/>
        <RouterView/>
        <Footer class="lg:mt-20"></Footer>
    </div>
</template>