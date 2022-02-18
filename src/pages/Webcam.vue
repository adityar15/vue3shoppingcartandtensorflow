<template>
  <div>
    <div class="flex justify-between items-center">
      <Title>Detector</Title>
    </div>

    <div
      class="mt-6 w-full"
    >
    <Detector />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "@vue/runtime-core";

const Title = defineAsyncComponent(()=>import(/*webpackChunkName:"title"*/'../components/Title.vue'))
const Detector = defineAsyncComponent(()=>import(/*webpackChunkName:"detector"*/'../components/Detector.vue'))
</script>
