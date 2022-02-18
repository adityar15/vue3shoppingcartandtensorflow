<template>
  <div class="grid place-items-center h-96">
    <div v-if="!isLoggedIn">
      <button
        @click="connectWallet"
        v-if="isMetamaskSupported"
        class="px-4 py-2 rounded bg-gradient-to-r from-orange-500 to-orange-600 text-gray-50 font-semibold"
      >
        Metamask Login
      </button>
      <Title v-else>Install Metamask extension</Title>
    </div>

    <div v-else>
        {{computedAddress}}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineAsyncComponent, computed } from "@vue/runtime-core";

const Title = defineAsyncComponent(
  () => import(/*webpackChunkName:"title"*/ "../components/Title.vue")
);

const isLoggedIn = ref(false);
const address = ref("")
const isMetamaskSupported = ref(false);
onMounted(() => {
  isMetamaskSupported.value = typeof (window as any).ethereum !== "undefined";
});

async function connectWallet() {
  const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
  address.value = accounts[0]
  isLoggedIn.value =  address.value ? true : false
}

const computedAddress = computed(()=> address.value.substring(0, 4) + '....')

</script>
