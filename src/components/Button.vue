<template>
    <button v-bind="$attrs" class="px-4 py-2 rounded bg-gradient-to-r from-gray-800 to-slate-800 text-gray-50 font-semibold">
        <slot />
    </button>
</template>