<script setup lang="ts">
    import Window from '@/components/General/Window.vue';
</script>

<template>
    <Window class="w-full h-full">
        <div class="flex flex-col">
            <!-- Header -->
            <div class="px-4 py-3 border-b border-gray-100">
            <span class="text-base font-medium text-gray-900">
                Tische & Auslastung (Jetzt)
            </span>
            </div>

            <!-- Content -->
            <div class="grid gap-3 px-4 py-4">
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                Belegte Tische
                </span>
                <span class="text-lg font-medium text-gray-900">
                18 / 24
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                Auslastung
                </span>
                <span class="text-lg font-medium text-gray-900">
                75 %
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                Ø Verweildauer
                </span>
                <span class="text-lg font-medium text-gray-900">
                1h 32m
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                Warteliste
                </span>
                <span class="text-sm font-medium text-gray-900 text-right">
                4 Gruppen
                </span>
            </div>
            </div>

            <!-- Optional Footer -->
            <div class="px-4 py-2 border-t border-gray-100 text-xs text-gray-400">
            Nächster freier Tisch in ca. 12 Minuten
            </div>
        </div>
    </Window>
</template>