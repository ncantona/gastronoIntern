<script setup lang="ts">

    const props = defineProps({
      modelValue: {
        type: Boolean,
        default: false,
      },
    })
    
    const emit = defineEmits(["update:modelValue"])
    
    function toggle() {
      emit("update:modelValue", !props.modelValue)
    }

</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    @click="toggle"
    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors
           focus:outline-none cursor-pointer"
    :class="modelValue ? 'bg-emerald-500' : 'bg-gray-300'"
  >
    <span
      class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform"
      :class="modelValue ? 'translate-x-5' : 'translate-x-1'">
    </span>
  </button>
</template>

