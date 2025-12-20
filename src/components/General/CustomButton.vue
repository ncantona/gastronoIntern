<script setup lang="ts">

type Variant = 'main' | 'delete' | 'setting' | 'cancel' | 'callWaiter' | 'submit' | 'logout' | 'editBlue' | 'editYellow';

const props = defineProps<{
  variant?: Variant;
}>();

const variant = props.variant ?? 'main';

const variantClasses: Record<Variant, string> = {
    main: `text-white
        bg-main-500/80
        hover:bg-main-500
        backdrop-blur-md
        transition-all
        duration-300
        ease-in-out
        hover:backdrop-blur-xl
        hover:shadow-[0_8px_24px_rgba(141,110,99,0.3)]
        hover:-translate-y-[2px]`,

    setting:
        `bg-[rgb(163,144,115)]
        text-[rgb(84,63,20)]
        hover:bg-[rgb(84,63,20)]
        hover:text-stone-200`,

    submit:
        `bg-green-600
        text-white
        hover:bg-green-500
        hover:text-white`,

    delete:
        `bg-red-700
        text-white
        hover:bg-red-600`,

    cancel:
        `bg-white
        text-blue-600
        hover:bg-gray-100`,

    callWaiter:
        `bg-[rgb(138,137,192)]
        text-[rgb(95,70,160)]
        hover:bg-[rgb(119,70,178)]
        hover:text-violet-200`,

    logout:
        `bg-red-700
        text-white
        hover:bg-red-600
        hover:text-white`,

    editBlue:
        `bg-blue-500
        text-white
        hover:bg-blue-400
        hover:text-white`,

    editYellow:
        `bg-yellow-500
        text-white
        hover:bg-yellow-400
        hover:text-white`,
}

</script>

<template>
    <button
    :class="[
    'font-semibold shadow-lg rounded-2xl p-4 py-3 transition-all duration-200 ease-in-out flex justify-center text-lg cursor-pointer items-center',
    variantClasses[variant]]">
        <slot>click me</slot>
    </button>
</template>