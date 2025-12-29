<script setup lang="ts">
    import Window from '@/components/General/Window.vue';
</script>

<template>
    <Window class="w-full h-full">
        <div class="flex flex-col">
            <!-- Header -->
            <div class="px-4 py-3 border-b border-gray-100">
            <span class="text-base font-medium text-gray-900">
                Bestellungen (Heute)
            </span>
            </div>

            <!-- Content -->
            <div class="grid gap-3 px-4 py-4">
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                Anzahl Bestellungen
                </span>
                <span class="text-lg font-medium text-gray-900">
                24
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                Umsatz gesamt
                </span>
                <span class="text-lg font-medium text-gray-900">
                842 €
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                Ø Umsatz pro Bestellung
                </span>
                <span class="text-lg font-medium text-gray-900">
                35,08 €
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                Top-Gericht
                </span>
                <span class="text-sm font-medium text-gray-900 text-right">
                Spaghetti Bolognese
                </span>
            </div>
            </div>

            <!-- Optional Footer -->
            <div class="px-4 py-2 border-t border-gray-100 text-xs text-gray-400">
            Letztes Update: vor 2 Minuten
            </div>
        </div>
    </Window>
</template>