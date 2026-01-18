<script setup lang="ts">

    const value = defineModel<boolean>();

</script>

<template>
    <button class="flex cursor-pointer flex-col break-all gap-2 mb-2 pr-6 mt-2">
        <div class="flex justify-between">
            <span class="font-semibold">
                <slot>Navbar Header</slot>
            </span>
            <img v-show="!value" src="@/assets/svgs/arrowDownBrown.svg" alt="Arrow Down" class="w-7">
            <img v-show="value" src="@/assets/svgs/arrowUpBrown.svg" alt="Arrow Up" class="w-7">
        </div>
      <div class="h-0.5 w-full bg-main-500 rounded mt-1"></div>
    </button>
</template>