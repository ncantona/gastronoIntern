<script setup lang="ts">
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { log } from '@/utils/logger';
    import router from '@/router';

    import NavbarButton from '@/components/Admin/Navbar/NavbarButton.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import Window from '@/components/General/Window.vue';

    import imgSrcBlackRestaurant from '@/assets/svgs/restaurant_black.svg';
    import imgSrcWhiteRestaurant from '@/assets/svgs/restaurant_white.svg';

    const authStore = useAuthStore();

    const value = defineModel<string>({ default: 'manageRestaurant' });

    const logout = async () => {
        try {
            log.info('Trying to loggout user.');
            await authStore.logout();
            router.push({ name: 'home' });
        } catch (error) {
            log.error('Logging out user failed.');
        }
    };

    const scrollWindowTop = () => window.scroll(0, 0);
    
</script>

<template>
    <Window class="flex flex-col sticky top-5">

        <nav class="flex w-full h-full flex-col gap-1">

            <h2 class="m-4 mb-0 flex justify-center text-2xl font-medium">Admin Panel</h2>
            <div class="m-4 mt-1 border-t self-center w-full pb-2 border-main-500/60 max-w-40"></div>

            <div class="flex flex-col justify-center gap-1 p-2">
                <NavbarButton
                    @click="value = 'manageRestaurant', scrollWindowTop()"
                    :isClicked="value === 'manageRestaurant'"
                    :imgSrcBlack="imgSrcBlackRestaurant"
                    :imgSrcWhite="imgSrcWhiteRestaurant"
                    imgSrcDesc="Gabel und Messer gekreuzt">
                    Restaurants verwalten
                </NavbarButton>

                <NavbarButton
                    @click="value = 'createRestaurant', scrollWindowTop()"
                    :isClicked="value === 'createRestaurant'"
                    :imgSrcBlack="imgSrcBlackRestaurant"
                    :imgSrcWhite="imgSrcWhiteRestaurant"
                    imgSrcDesc="Gabel und Messer gekreuzt">
                    Restaurant anlegen
                </NavbarButton>
            </div>

        </nav>

        <div class="p-6 flex flex-col">
            <div class="m-4 self-center w-full border-t pb-2 border-main-500/60 max-w-40"></div>
            <CustomButton
                variant="logout"
                class="w-full"
                @click="logout()">
                Abmelden
            </CustomButton>
        </div>

    </Window>
</template>