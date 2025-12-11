<script setup lang="ts">
import { mainColor, mainColorDark } from '@/assets/mainColors';


</script>

<template>
    <footer class="text-white py-10"
            :style="{backgroundColor: mainColor}">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
            <h2 class="text-xl font-semibold text-white">Restaurant System</h2>
            <p class="mt-2 text-sm text-gray-400">
            Verwaltung, Reservierungen und Bestellungen – alles an einem Ort.
            </p>
        </div>

        <div>
            <h3 class="text-lg font-semibold text-white mb-3">Navigation</h3>
            <ul class="space-y-2">
                <li><a href="#" class="hover:text-white">Home</a></li>
                <li><a href="#" class="hover:text-white">Dashboard</a></li>
                <li><a href="#" class="hover:text-white">Login</a></li>
                <li><a href="#" class="hover:text-white">Kontakt</a></li>
            </ul>
        </div>

        <div>
            <h3 class="text-lg font-semibold text-white mb-3">Kontakt</h3>
            <ul class="space-y-2">
                <li>Email: info@restaurant.de</li>
                <li>Telefon: +49 123 456789</li>
                <li>Adresse: Musterstraße 12, 12345 Berlin</li>
            </ul>
        </div>

        </div>

        <div class="border-t border-gray-700 mt-10 pt-6 text-center text-sm"
                    :style="{color: mainColorDark}">
        © 2025 Gastrono. Alle Rechte vorbehalten.
        </div>
    </footer>
</template>