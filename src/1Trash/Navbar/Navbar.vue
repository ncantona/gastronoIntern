<script setup lang="ts">
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { log } from '@/utils/logger';
    import router from '@/router';
    import { ref } from 'vue';

    import NavbarSectionHeader from '@/components/Navbar/NavbarSectionHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import NavbarButton from '@/components/Navbar/NavbarButton.vue';

    type ActiveSection = 'general' | 'restaurant' | 'user' | null;

    interface NavbarButton {
        label: string;
        key: string;
    }

    interface NavbarSection {
        title: string;
        key: string;
        buttons: NavbarButton[];
    }

    const props = defineProps<{
        navbar: NavbarSection[],
        header: string,
    }>();

    const value = defineModel<string>();

    const authStore = useAuthStore();

    const showGeneral = ref(false);
    const showRestaurant = ref(false);
    const showUser = ref(false);

    const activeSection = ref<ActiveSection[]>([]);
    const activeSubButton = ref<string>('');

    const changeSection = (activeSectionKey: ActiveSection) => {
    if (activeSection.value.includes(activeSectionKey)) {
        activeSection.value = activeSection.value.filter(as => as !== activeSectionKey);

        if (activeSectionKey === 'general')
            showGeneral.value = false;
        else if (activeSectionKey === 'restaurant')
            showRestaurant.value = false;
        else if (activeSectionKey === 'user')
            showUser.value = false;
    }
    else {
        activeSection.value.push(activeSectionKey);

        if (activeSectionKey === 'general')
            showGeneral.value = true;
        else if (activeSectionKey === 'restaurant')
            showRestaurant.value = true;
        else if (activeSectionKey === 'user')
            showUser.value = true;
    }
    };

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
  <div class="fixed top-0 bottom-0 w-[19rem] bg-white/80 flex flex-col z-40">

    <nav class="flex w-full text-lg h-full flex-col p-6 pr-0 gap-1">

        <div class="flex flex-col mb-6 pr-6">
            <span class="mainHeader mb-4">{{ header }}</span>
            <div class="h-0.5 w-30 self-center bg-main-500 rounded mb-4"></div>
        </div>

        <template v-for="section in navbar" :key="section.key">

            <NavbarSectionHeader
                @click="changeSection(section.key as ActiveSection)"
                :model-value="activeSection.includes(section.key as ActiveSection)">
                {{ section.title }}
            </NavbarSectionHeader>

            <div
                class="overflow-hidden transition-all duration-500"
                :class="activeSection.includes(section.key as ActiveSection)
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0'">
                <NavbarButton
                    v-for="button in section.buttons"
                    :key="button.key"
                    @click="activeSubButton = button.key; value = button.key"
                    :class="activeSubButton === button.key
                    ? 'bg-main-500 hover:bg-main-500 text-white'
                    : 'hover:bg-main-500/30'">
                    {{ button.label }}
                </NavbarButton>
            </div>

        </template>

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
  </div>
</template>