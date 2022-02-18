<template>
    <select class="p-2 rounded border shadow mt-4" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
        <slot />
    </select>
</template>

<script lang="ts" setup>
const props = defineProps<{
    modelValue: string
}>()
const emits = defineEmits<{
    (e: "update:modelValue", value: string) : void
}>()
</script>

