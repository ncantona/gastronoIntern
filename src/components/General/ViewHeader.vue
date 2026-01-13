<script setup lang="ts">

</script>

<template>
    <div class="p-8 px-0">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">
            <slot name="title"></slot>
        </h1>
        <p class="text-slate-600">
            <slot name="subtitle"></slot>
        </p>
    </div>
</template>