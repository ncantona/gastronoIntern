<script setup lang="ts">
    import { ref } from 'vue';

    const props = defineProps<{
        isClicked: boolean,
        imgSrcBlack: string,
        imgSrcWhite: string,
        imgSrcDesc: string,
    }>();

    const isHovered = ref<boolean>(false);

</script>


<template>
    <button
        class="p-2 text-left rounded-lg transition-colors w-full cursor-pointer"
        :class="isClicked ? 'bg-main-500 hover:bg-main-500 text-white' : 'hover:bg-main-50'"
        @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <div class="flex justify-between items-center">

            <div class="flex gap-3 items-center">
                <img
                    v-show="!isClicked"
                    :src="imgSrcBlack"
                    :alt="imgSrcDesc"
                    class="w-5">
                    
                <img
                    v-show="isClicked"
                    :src="imgSrcWhite"
                    :alt="imgSrcDesc"
                    class="w-5">
                <slot>Navbar Button</slot>
            </div>

            <img
                v-show="isHovered && !isClicked"
                src="@/assets/svgs/arrowRightBlack.svg"
                alt="Schwarzer Pfeil nach rechts zeigend"
                class="w-5">

            <img
                v-show="isClicked"
                src="@/assets/svgs/arrowRightWhite.svg"
                alt="Weißer Pfeil nach rechts zeigend"
                class="w-5">

        </div>
    </button>
</template>