<script setup lang="ts">
import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import MealWindow from './MealWindow.vue';

const props = defineProps<{ orderId: number }>();

const activeOrdersStore = useRestaurantActiveOrdersStore();

const order = computed(() => {
  const o = activeOrdersStore.activeOrders.find(o => o.id === props.orderId);
  if (!o) return null;
  const items = o.items.filter(i => i.type === 'MEAL' && !i.isPickedUp);
  if (items.length === 0) return null;
  return { ...o, items };
});

const sortedItems = computed(() => {
  if (!order.value) return [];
  return [...order.value.items].sort((a, b) => Number(a.isDone) - Number(b.isDone));
});

const now = ref(Date.now());
const orderTime = computed(() => order.value?.datetime.split('T')[1]?.substring(0, 5));

let intervalID: number | undefined;

const isAllDone = computed(() => {
  if (!order.value) return false;
  return order.value.items.length > 0 && order.value.items.every(i => i.isDone);
});

const elapsedMinutes = computed(() => {
  if (!order.value) return 0;
  const orderDate = new Date(order.value.datetime);
  const diffMs = now.value - orderDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  return Math.floor(diffSeconds / 60);
});

const timeStatusClass = computed(() => {
  if (elapsedMinutes.value >= 10) return 'border-red-400 bg-red-100 text-red-700';
  if (elapsedMinutes.value >= 7) return 'border-orange-400 bg-orange-100 text-orange-700';
  return '';
});

const passedTime = computed(() => {
  if (!order.value) return '';
  const orderDate = new Date(order.value.datetime);
  const diffMs = now.value - orderDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;
  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');
  const ss = seconds.toString().padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
});

onMounted(() => {
  intervalID = window.setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

onUnmounted(() => {
  if (intervalID) clearInterval(intervalID);
});
</script>

<template>
  <div class="flex h-full border-2 rounded-2xl w-full p-1.5 bg-main-500 border-main-500 shadow-lg min-h-55 overflow-y-hidden hover:overflow-y-auto">
    <div :class="['flex flex-col rounded-lg relative overflow-y-auto p-4 min-w-70 max-w-55 shadow-xl', isAllDone ? 'bg-green-100' : 'bg-white/90']">
      <div v-show="isAllDone" class="absolute top-0 left-0 right-0 h-full flex items-center justify-center z-20 pointer-events-none">
        <img src="@/assets/svgs/checkGreen.svg" alt="done" class="w-25 opacity-60">
      </div>
      <div class="flex flex-col gap-1 mb-5 border-2 rounded-2xl -m-2 p-1 border-main-500 bg-white/80">
        <div class="flex gap-2 justify-center text-xl font-medium items-center">
          <img src="@/assets/svgs/table.svg" alt="table" class="w-10">
          {{ order?.tableId }}
        </div>
        <div class="flex justify-between">
          <div class="flex items-center gap-1.5 border-2 w-25.5 border-main-500/50 p-1 pl-3 pr-3 rounded-4xl">
            <img src="@/assets/svgs/order.svg" alt="order time" class="w-6">
            <span class="font-mono">{{ orderTime }}</span>
          </div>
          <div :class="[timeStatusClass]" class="flex items-center gap-1.5 border-2 border-main-500/50 p-1 pl-3 pr-3 rounded-4xl">
            <img src="@/assets/svgs/timer.svg" alt="timer" class="w-6">
            <span class="font-mono">{{ passedTime.substring(0, 2) == '00' ? passedTime.substring(3) : passedTime }}</span>
          </div>
        </div>
      </div>

      <div v-for="item in sortedItems" :key="item.id" class="mb-3">
        <MealWindow :order-id="props.orderId" :item="item" :hide-done-overlay="isAllDone" />
      </div>
    </div>
  </div>
</template>
