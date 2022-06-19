<template>
    <label v-bind="$attrs" class="label" :class="entering ? 'bg-gray-500' : 'bg-gray-100'" @drop.prevent="handleDrop" @dragenter="entering=true" @dragleave="entering=false">
        <input multiple type="file" class="input" @input="handleInput">
        <span class="message">Drop your files here</span>
    </label>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue"

const events = ["dragenter", "dragleave", "dragover", "drop"]

onMounted(()=>{
    events.forEach(event => document.body.addEventListener(event, (e)=>e.preventDefault()))
})

onUnmounted(()=>{
    events.forEach(event => document.body.removeEventListener(event, (e)=>e.preventDefault()))
})

const emit = defineEmits<{(e:"upload", files: File[]):void}>()

const entering = ref(false)

function handleDrop(e : DragEvent) : void
{
    const files = e.dataTransfer?.files as FileList
    emit("upload", [...files])
}

function handleInput(e : InputEvent) : void
{
    const files = (e.target as HTMLInputElement).files as FileList
    emit("upload", [...files])
}

</script>

<style scoped>
.label {
    @apply relative transition-all ease-in-out duration-300 border border-gray-500 hover:bg-gray-400;
}
.input {
    @apply absolute top-0 left-0 w-full h-full hidden;
}
.message {
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2; 
}
</style>