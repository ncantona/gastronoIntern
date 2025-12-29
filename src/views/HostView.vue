<script setup lang="ts">
import Window from '@/components/General/Window.vue';
	import OrderStatsDay from '@/components/Host/Dashboard/OrderStatsDay.vue';
import TischStatsNow from '@/components/Host/Dashboard/TischStatsNow.vue';

</script>

<template>
	<div class="">
		<Window>
			<div class="flex flex-col">
				<span class="text-xl font-medium">Schön, dass du wieder da bist!</span>
				<span>Hier findest du das Wichtigste von heute</span>
			</div>
		</Window>
		<div class="flex gap-2">

			<OrderStatsDay/>
			<TischStatsNow/>
			<Window class="w-full h-full">
  <div class="flex flex-col">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-100">
      <span class="text-base font-medium text-gray-900">
        Service & Küche (Live)
      </span>
    </div>

    <!-- Content -->
    <div class="grid gap-3 px-4 py-4">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">
          Offene Bestellungen
        </span>
        <span class="text-lg font-medium text-gray-900">
          7
        </span>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">
          Ø Zubereitungszeit
        </span>
        <span class="text-lg font-medium text-gray-900">
          14 min
        </span>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">
          Verzögerte Bestellungen
        </span>
        <span class="text-lg font-medium text-red-600">
          2
        </span>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">
          Ausverkaufte Gerichte
        </span>
        <span class="text-sm font-medium text-gray-900 text-right">
          1
        </span>
      </div>
    </div>

    <!-- Optional Footer -->
    <div class="px-4 py-2 border-t border-gray-100 text-xs text-gray-400">
      Küche aktuell leicht ausgelastet
    </div>
  </div>
</Window>
		</div>
	</div>
</template>