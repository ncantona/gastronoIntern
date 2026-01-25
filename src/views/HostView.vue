<script setup lang="ts">
import { ref } from 'vue';
import Window from '@/components/General/Window.vue';
import OrderStatsDay from '@/components/Host/Dashboard/OrderStatsDay.vue';
import TischStatsNow from '@/components/Host/Dashboard/TischStatsNow.vue';

// Mock Daten
const dashboardStats = ref({
  totalRevenue: 2845,
  totalOrders: 34,
  averageOrderValue: 83.68,
  customersServed: 28
});

const activeOrders = ref([
  { id: 1, table: 'Tisch 3', items: 'Margherita, Carbonara', time: '8 min', status: 'Zubereitung' },
  { id: 2, table: 'Tisch 5', items: 'Steak, Gemüse', time: '12 min', status: 'In Küche' },
  { id: 3, table: 'Tisch 1', items: 'Pasta Bolognese', time: '5 min', status: 'Zubereitung' },
  { id: 4, table: 'Tisch 8', items: 'Caesar Salad, Brot', time: '3 min', status: 'Abholung' },
  { id: 5, table: 'Tisch 2', items: 'Tiramisu, Espresso', time: '2 min', status: 'Abholung' }
]);

const topDishes = ref([
  { name: 'Carbonara', orders: 12, status: 'Verfügbar' },
  { name: 'Margherita', orders: 11, status: 'Verfügbar' },
  { name: 'Tiramisu', orders: 9, status: 'Verfügbar' },
  { name: 'Rumpsteak', orders: 8, status: 'Begrenzt' },
  { name: 'Seafood Risotto', orders: 7, status: 'Verfügbar' }
]);

const tableStatus = ref([
  { table: 'Tisch 1', status: 'Besetzt', duration: '35 min', guests: 2 },
  { table: 'Tisch 2', status: 'Besetzt', duration: '22 min', guests: 4 },
  { table: 'Tisch 3', status: 'Besetzt', duration: '45 min', guests: 3 },
  { table: 'Tisch 4', status: 'Frei', duration: '-', guests: 0 },
  { table: 'Tisch 5', status: 'Besetzt', duration: '15 min', guests: 2 },
  { table: 'Tisch 6', status: 'Reinigung', duration: '5 min', guests: 0 },
  { table: 'Tisch 7', status: 'Frei', duration: '-', guests: 0 },
  { table: 'Tisch 8', status: 'Besetzt', duration: '28 min', guests: 5 }
]);

const staffStatus = ref([
  { name: 'Anna', role: 'Kellnerin', tables: [1, 3, 5], status: 'Aktiv' },
  { name: 'Marco', role: 'Chef', tables: [], status: 'In Küche' },
  { name: 'Lisa', role: 'Kellnerin', tables: [2, 4, 8], status: 'Aktiv' },
  { name: 'Thomas', role: 'Sous Chef', tables: [], status: 'In Küche' }
]);

const revenueData = ref([
  { hour: '11:00', revenue: 120 },
  { hour: '12:00', revenue: 340 },
  { hour: '13:00', revenue: 520 },
  { hour: '14:00', revenue: 480 },
  { hour: '17:00', revenue: 210 },
  { hour: '18:00', revenue: 625 },
  { hour: '19:00', revenue: 785 }
]);

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Besetzt': 'bg-green-100 text-green-800',
    'Frei': 'bg-blue-100 text-blue-800',
    'Reinigung': 'bg-yellow-100 text-yellow-800',
    'Verfügbar': 'bg-green-100 text-green-800',
    'Begrenzt': 'bg-orange-100 text-orange-800',
    'Zubereitung': 'bg-blue-100 text-blue-800',
    'In Küche': 'bg-purple-100 text-purple-800',
    'Abholung': 'bg-green-100 text-green-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};
</script>

<template>
  <div class="space-y-4">
    <!-- Greeting Header -->
    <Window>
      <div class="flex flex-col">
        <span class="text-2xl font-bold text-gray-900">Willkommen zurück! 👋</span>
        <span class="text-gray-600 mt-1">Hier ist dein Restaurant Dashboard für heute</span>
      </div>
    </Window>

    <!-- Key Metrics Row -->
    <div class="grid grid-cols-4 gap-4">
      <Window>
        <div class="flex flex-col">
          <span class="text-sm text-gray-500 font-medium">Umsatz heute</span>
          <span class="text-3xl font-bold text-gray-900 mt-2">{{ dashboardStats.totalRevenue }}€</span>
          <span class="text-xs text-green-600 mt-1">↑ 12% vs. gestern</span>
        </div>
      </Window>

      <Window>
        <div class="flex flex-col">
          <span class="text-sm text-gray-500 font-medium">Bestellungen</span>
          <span class="text-3xl font-bold text-gray-900 mt-2">{{ dashboardStats.totalOrders }}</span>
          <span class="text-xs text-green-600 mt-1">↑ 5% vs. gestern</span>
        </div>
      </Window>

      <Window>
        <div class="flex flex-col">
          <span class="text-sm text-gray-500 font-medium">Ø Bestellwert</span>
          <span class="text-3xl font-bold text-gray-900 mt-2">{{ dashboardStats.averageOrderValue }}€</span>
          <span class="text-xs text-red-600 mt-1">↓ 2% vs. gestern</span>
        </div>
      </Window>

      <Window>
        <div class="flex flex-col">
          <span class="text-sm text-gray-500 font-medium">Gäste bedient</span>
          <span class="text-3xl font-bold text-gray-900 mt-2">{{ dashboardStats.customersServed }}</span>
          <span class="text-xs text-green-600 mt-1">↑ 8% vs. gestern</span>
        </div>
      </Window>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Active Orders -->
      <Window>
        <div class="flex flex-col h-full">
          <div class="pb-3 border-b border-gray-100">
            <span class="text-lg font-bold text-gray-900">Aktive Bestellungen</span>
          </div>
          <div class="mt-4 space-y-2 overflow-y-auto max-h-64">
            <div v-for="order in activeOrders" :key="order.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="font-medium text-gray-900">{{ order.table }}</span>
                  <span :class="['text-xs px-2 py-1 rounded', getStatusColor(order.status)]">
                    {{ order.status }}
                  </span>
                </div>
                <span class="text-xs text-gray-500 mt-1">{{ order.items }}</span>
              </div>
              <span class="text-sm font-medium text-orange-600">{{ order.time }}</span>
            </div>
          </div>
        </div>
      </Window>

      <!-- Service & Küche Stats -->
      <Window>
        <div class="flex flex-col">
          <div class="pb-3 border-b border-gray-100">
            <span class="text-lg font-bold text-gray-900">Service & Küche (Live)</span>
          </div>
          <div class="mt-4 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Offene Bestellungen</span>
              <span class="text-2xl font-bold text-gray-900">7</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: 70%"></div>
            </div>

            <div class="flex items-center justify-between mt-4">
              <span class="text-sm text-gray-600">Ø Zubereitungszeit</span>
              <span class="text-2xl font-bold text-gray-900">14 min</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-600 h-2 rounded-full" style="width: 60%"></div>
            </div>

            <div class="flex items-center justify-between mt-4">
              <span class="text-sm text-gray-600">Verzögerte Bestellungen</span>
              <span class="text-2xl font-bold text-red-600">2</span>
            </div>

            <div class="flex items-center justify-between mt-4">
              <span class="text-sm text-gray-600">Auslastung Küche</span>
              <span class="text-2xl font-bold text-orange-600">85%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-orange-600 h-2 rounded-full" style="width: 85%"></div>
            </div>

            <div class="mt-4 p-2 bg-blue-50 rounded border border-blue-200">
              <span class="text-xs text-blue-700">💡 Küche aktuell gut ausgelastet</span>
            </div>
          </div>
        </div>
      </Window>

      <!-- Top Dishes -->
      <Window>
        <div class="flex flex-col">
          <div class="pb-3 border-b border-gray-100">
            <span class="text-lg font-bold text-gray-900">Top Gerichte heute</span>
          </div>
          <div class="mt-4 space-y-2">
            <div v-for="(dish, idx) in topDishes" :key="idx" class="flex items-center justify-between p-2">
              <div class="flex items-center gap-3">
                <span class="text-lg font-bold text-gray-400">{{ idx + 1 }}</span>
                <div>
                  <span class="block text-sm font-medium text-gray-900">{{ dish.name }}</span>
                  <span class="text-xs text-gray-500">{{ dish.orders }} Bestellungen</span>
                </div>
              </div>
              <span :class="['text-xs px-2 py-1 rounded font-medium', getStatusColor(dish.status)]">
                {{ dish.status }}
              </span>
            </div>
          </div>
        </div>
      </Window>

      <!-- Umsatz Trend -->
      <Window>
        <div class="flex flex-col">
          <div class="pb-3 border-b border-gray-100">
            <span class="text-lg font-bold text-gray-900">Umsatz Trend</span>
          </div>
          <div class="mt-4 h-48 flex items-end justify-around gap-2">
            <div v-for="(data, idx) in revenueData" :key="idx" class="flex flex-col items-center">
              <div class="w-6 bg-blue-500 rounded-t transition hover:bg-blue-600" 
                   :style="{ height: (data.revenue / 8) + 'px' }"></div>
              <span class="text-xs text-gray-500 mt-2">{{ data.hour }}</span>
            </div>
          </div>
        </div>
      </Window>
    </div>

    <!-- Bottom Row - Tables & Staff -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Table Status -->
      <Window>
        <div class="flex flex-col">
          <div class="pb-3 border-b border-gray-100">
            <span class="text-lg font-bold text-gray-900">Tische Status</span>
          </div>
          <div class="mt-4 grid grid-cols-4 gap-3">
            <div v-for="table in tableStatus" :key="table.table" class="flex flex-col items-center">
              <div :class="['w-16 h-16 rounded-lg flex items-center justify-center font-bold text-white cursor-pointer transition hover:scale-105', 
                            table.status === 'Besetzt' ? 'bg-green-500' : 
                            table.status === 'Reinigung' ? 'bg-yellow-500' : 'bg-gray-300']">
                {{ table.table.split(' ')[1] }}
              </div>
              <span class="text-xs text-gray-600 mt-2 font-medium">{{ table.status }}</span>
              <span v-if="table.duration !== '-'" class="text-xs text-gray-400">{{ table.duration }}</span>
            </div>
          </div>
        </div>
      </Window>

      <!-- Staff Status -->
      <Window>
        <div class="flex flex-col">
          <div class="pb-3 border-b border-gray-100">
            <span class="text-lg font-bold text-gray-900">Personal Status</span>
          </div>
          <div class="mt-4 space-y-2">
            <div v-for="staff in staffStatus" :key="staff.name" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex-1">
                <div class="font-medium text-gray-900">{{ staff.name }}</div>
                <span class="text-xs text-gray-500">{{ staff.role }}</span>
              </div>
              <div class="text-right">
                <div v-if="staff.tables.length > 0" class="text-xs text-gray-600 mb-1">
                  Tische: {{ staff.tables.join(', ') }}
                </div>
                <span :class="['text-xs px-2 py-1 rounded font-medium', 
                              staff.status === 'Aktiv' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800']">
                  {{ staff.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Window>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>