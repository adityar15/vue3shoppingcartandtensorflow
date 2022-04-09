<template>
    <div class="h-screen grid place-items-center">
        <div class="w-1/2">
            <InputBox placeholder="Enter your text here ..." v-model="text" />
            Text: {{text}}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from "vue";

const InputBox = defineAsyncComponent(()=>import(/*webpackChunkName:"inputbox"*/ '../components/InputBox.vue'))

const text = ref <string>("")
</script>