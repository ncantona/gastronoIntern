<script setup lang="ts">

import Footer from '@/components/Homepage/Footer.vue';
import Navbar from '@/components/Homepage/Navbar.vue';

</script>

<template>
    <div class="min-h-screen w-full">
        <Navbar class="mb-10 lg:mb-20"/>
        <RouterView/>
        <Footer class="lg:mt-20"></Footer>
    </div>
</template>