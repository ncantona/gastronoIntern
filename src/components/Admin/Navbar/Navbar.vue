<script setup lang="ts">
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { log } from '@/utils/logger';
    import router from '@/router';
    import { ref } from 'vue';

    import imgSrcBlackRestaurant from '@/assets/svgs/restaurant_black.svg';
    import imgSrcWhiteRestaurant from '@/assets/svgs/restaurant_white.svg';
    import imgSrcBlackStatistics from '@/assets/svgs/statisticsUpBlack.svg';
    import imgSrcWhiteStatistics from '@/assets/svgs/statisticsUpWhite.svg';
    import imgSrcBlackPerson from '@/assets/svgs/person_black.svg';
    import imgSrcWhitePerson from '@/assets/svgs/person_white.svg';

    import NavbarButton from '@/components/Admin/Navbar/NavbarButton.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
import Window from '@/components/General/Window.vue';

    const authStore = useAuthStore();

    const activeButton = ref<string>('restaurant');

    const value = defineModel<string>();

    const handleLogout = async () => {
        try {
            log.info('Trying to loggout user.');
        await authStore.logout();
            router.push({ name: 'home' });
        } catch (error) {
            log.error('Logging out user failed.');
        }
    };

</script>

<template>
  <Window class="flex flex-col sticky top-5">

    <nav class="flex w-full h-full flex-col gap-1">

        <span class="subHeader m-4 border-b pb-2 border-main-500/60">Admin Panel</span>

        <div class="flex flex-col justify-center gap-1 p-2">
<!--             <NavbarButton
                @click="activeButton = 'statistics'; value = 'statistics'"
                :isClicked="activeButton === 'statistics'"
                :imgSrcBlack="imgSrcBlackStatistics"
                :imgSrcWhite="imgSrcWhiteStatistics"
                imgSrcDesc="Statistik Icon">
                Statistiken
            </NavbarButton> -->
            <NavbarButton
                @click="activeButton = 'restaurant'; value = 'restaurant'"
                :isClicked="activeButton === 'restaurant'"
                :imgSrcBlack="imgSrcBlackRestaurant"
                :imgSrcWhite="imgSrcWhiteRestaurant"
                imgSrcDesc="Restaurant Icon">
                Restaurants
            </NavbarButton>
<!--             <NavbarButton
                @click="activeButton = 'user'; value = 'user'"
                :isClicked="activeButton === 'user'"
                :imgSrcBlack="imgSrcBlackPerson"
                :imgSrcWhite="imgSrcWhitePerson"
                imgSrcDesc="User Icon">
                Benutzer
            </NavbarButton> -->
        </div>

    </nav>

    <div class="p-6 flex flex-col border-main-500">
        <div class="h-0.5 w-30 self-center bg-main-500 rounded mb-4"></div>

            <CustomButton
                variant="logout"
                class="w-full"
                @click="handleLogout">
                Abmelden
            </CustomButton>
    </div>
  </Window>
</template>