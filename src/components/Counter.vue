<template>
    <div>
        <p class="text-center my-2 text-gray-700">Current count: {{ count }}</p>
        <button @click="increment" data-type="increment" class="px-4 py-2 bg-emerald-500 text-gray-100 font-semibold rounded-md">Increment</button>
        <button @click="decrement" data-type="decrement" class="px-4 py-2 bg-rose-500 text-gray-50 font-semibold rounded-md ml-5">Decrement</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const count = ref<number>(0)

function increment() : void
{
    count.value++
}

function decrement() : void
{
    count.value--
}
</script>

<style scoped>

</style>