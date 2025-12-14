<script setup lang="ts">
  import { usePopupStore } from './stores/General/usePopupStore';
  import PopupWindow from '@/components/General/PopupWindow.vue';
  
  const popupStore = usePopupStore();
</script>

<template>
  <div class="flex justify-center">
    <RouterView/>
    <PopupWindow
      v-if="popupStore.success"
      @close="popupStore.clearSuccess"
      class="self-center z-100">
      {{ popupStore.success }}
    </PopupWindow>
    <PopupWindow
      v-if="popupStore.error"
      @close="popupStore.clearError"
      type="error"
      class="self-center z-100">
      {{ popupStore.error }}
    </PopupWindow>
  </div>
</template>
