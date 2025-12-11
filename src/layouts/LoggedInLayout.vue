<script setup lang="ts">

import BaseNavbar from '@/components/Homepage/BaseNavbar.vue';
import Footer from '@/components/Homepage/Footer.vue';
import Navbar from '@/components/Homepage/Navbar.vue';

</script>

<template>
    <div class="min-h-screen w-full">
        <BaseNavbar class="mb-10 lg:mb-20"/>
        <RouterView/>
        <Footer class="lg:mt-20"></Footer>
    </div>
</template>