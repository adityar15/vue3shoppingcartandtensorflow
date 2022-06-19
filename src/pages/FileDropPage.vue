<template>
    <div class="grid place-items-center mx-auto h-96">
        <FileDrop class="w-72 h-72" @upload="startUpload" />
    </div>
</template>

<script setup lang="ts">
import {defineAsyncComponent} from "vue"

const FileDrop = defineAsyncComponent(()=>import(/*webpackChunkName:"filedrop"*/ "../components/FileDrop.vue"))

function startUpload(files : File[]) : void
{
    files.map(file => console.log("uploading", file))
}

</script>

<style lang="scss" scoped>

</style>