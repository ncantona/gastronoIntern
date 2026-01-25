<script setup lang="ts">
    import { computed, ref } from 'vue';

    import BurgerMenueSVG from '@/components/Svgs/BurgerMenueSVG.vue';
    import MonitorSVG from '@/components/Svgs/MonitorSVG.vue';
    import DashboardSVG from '@/components/Svgs/DashboardSVG.vue';
    import RestaurantSVG from '@/components/Svgs/RestaurantSVG.vue';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import router from '@/router';
    import { useRoute } from 'vue-router';
    import RestaurantMenuSVG from '@/components/Svgs/RestaurantMenuSVG.vue';
    import BeerSVG from '@/components/Svgs/BeerSVG.vue';

    const authStore = useAuthStore();

    const route = useRoute();
    const activeLink = computed(() => {
        return route.meta.sectionName?.toString() ?? '';
    })

    const activeNavWindow = ref<string>('');
    
    const logout = async () => {
        try {
            await authStore.logout();
            router.push({ name: 'home' });
        } catch {

        }
    } 

</script>

<template>
    <div @click="activeNavWindow = ''" class="lg:w-full w-screen items-center text-white lg:h-22 shadow-lg flex justify-center p-5 mb-2.5 bg-main-500">
        <div class="flex justify-between max-w-330 w-full">
            <div class="gap-5 flex">
                <RouterLink :to="{ name: 'dashboardhost' }" class="z-50" @click="activeLink = 'dashboardhost'">
                    <img src="@/assets/images/Logo.svg" alt="Gastrono Logo" class="max-w-60 h-15">
                </RouterLink>
                <RouterLink :to="{ name: 'dashboardhost'}" @click="activeLink = 'dashboardhost'" :class="activeLink === 'dashboardhost' ? '' : 'text-white/70 hover:text-white/90'" class="z-50 lg:flex hidden flex-col items-center gap-1">
                    <DashboardSVG class="w-8 h-8" :class="activeLink === 'dashboardhost' ? 'text-blue-500' : ''"/>
                    <span>Dashboard</span>
                </RouterLink>
                <div class="relative lg:flex hidden justify-center" @click.stop>
                    <button
                        @click="activeNavWindow = (activeNavWindow === 'restaurant' ? '' : 'restaurant')"
                        :class="activeNavWindow === 'restaurant' ? 'text-white' : 'text-white/70'"
                        class="z-50 flex flex-col items-center gap-1 hover:text-white/90 ">
                        <RestaurantSVG class="w-8 h-8" :class="activeLink === 'restaurant' ? 'text-blue-500' : ''"/>
                        <span>Restaurant</span>
                    </button>

                    <div
                        v-if="activeNavWindow === 'restaurant'"
                        class="absolute left-0 z-50 top-full mt-2 w-48 bg-white text-black rounded-lg shadow-md p-3">
                        
                        <RouterLink
                            :to="{ name: 'orders' }"
                            class="block w-full px-3 py-2 hover:bg-main-100/50 rounded"
                            @click="activeNavWindow = ''">
                            <div class="flex gap-2 items-center">
                                <img src="@/assets/svgs/order.svg" alt="" class="max-w-6">
                                Tische
                            </div>
                        </RouterLink>

                        <RouterLink
                            :to="{ name: 'menu' }"
                            class="block w-full px-3 py-2 hover:bg-main-100/50 rounded"
                            @click="activeNavWindow = ''">
                            <div class="flex gap-2 items-center">
                                <RestaurantMenuSVG class="max-w-6"/>
                                Speisekarte
                            </div>
                        </RouterLink>

                        <RouterLink
                            :to="{ name: 'managerestaurant' }"
                            class="block w-full px-3 py-2 hover:bg-main-100/50 rounded"
                            @click="activeNavWindow = ''">
                            <div class="flex gap-2 items-center">
                                <img src="@/assets/svgs/settingsBlack.svg" alt="" class="max-w-6">
                                Verwaltung
                            </div>
                        </RouterLink>
                    </div>
                </div>
                <div class="relative lg:flex hidden justify-center" @click.stop>
                    <button
                        @click="activeNavWindow = (activeNavWindow === 'livedashboard' ? '' : 'livedashboard')"
                        :class="activeNavWindow === 'livedashboard' ? 'text-white hover:text-white' : 'hover:text-white/90 text-white/70'"
                        class="z-50 flex flex-col items-center gap-1">
                        <MonitorSVG class="w-8 h-8" :class="activeLink === 'livedashboard' ? 'text-blue-500' : ''"/>
                        <span>Live Dashboards</span>
                    </button>

                    <div
                        v-if="activeNavWindow === 'livedashboard'"
                        class="absolute left-0 z-50 top-full mt-2 w-48 bg-white text-black rounded-lg shadow-md p-3">

                        <RouterLink
                            :to="{ name: 'dashboardkitchenlive'}"
                            class="block w-full px-3 py-2 hover:bg-main-100/50 rounded"
                            @click="activeNavWindow = ''">
                            <div class="flex gap-2 items-center">
                                <img src="@/assets/svgs/cookHat.svg" alt="" class="max-w-6">
                                <span>Küche</span>
                            </div>
                        </RouterLink>

                        <RouterLink
                            :to="{ name: 'dashboardbarlive'}"
                            class="block w-full px-3 py-2 hover:bg-main-100/50 rounded"
                            @click="activeNavWindow = ''">
                            <div class="flex gap-2 items-center">
                                <BeerSVG class="max-w-6"/>
                                <span>Bar</span>
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div class="relative flex justify-end w-full lg:w-0" @click.stop>
                <button
                    @click="activeNavWindow = (activeNavWindow === 'burger' ? '' : 'burger')"
                    :class="activeNavWindow === 'burger' ? 'text-white' : 'text-white/70 hover:text-white/90'"
                    class="z-50 flex items-center">
                    <BurgerMenueSVG class="w-12 h-12"/>
                </button>

                <div
                    v-if="activeNavWindow === 'burger'"
                    class="absolute right-0 z-50 top-full mt-2 w-48 bg-white text-black rounded-lg shadow-md p-3">

                    <RouterLink
                        :to="{ name: 'dashboardhost' }"
                        class="block w-full px-3 py-2 hover:bg-main-100/50 rounded">
                        <div class="flex gap-2 items-center">
                            <img src="@/assets/svgs/settingsBlack.svg" alt="" class="max-w-6">
                            Einstellungen
                        </div>
                    </RouterLink>

                    <button
                        class="block w-full text-left px-3 py-2 hover:bg-main-100/50 rounded"
                        @click="logout()">
                        <div class="flex gap-2 items-center">
                            <img src="@/assets/svgs/logout.svg" alt="" class="max-w-6">
                            Abmelden
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <div
            v-if="['livedashboard', 'restaurant', 'burger'].includes(activeNavWindow)"
            @click="activeNavWindow = ''"
            class="fixed inset-0 z-40">
        </div>
    </div>
</template>