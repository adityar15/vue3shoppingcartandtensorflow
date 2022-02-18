<template>
  <div class="space-y-2">
    <div class="group relative space-y-3">
      <div
        class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
      >
        <img
          :src="props.product.imageSrc"
          :alt="props.product.imageAlt"
          class="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div class="mt-4 flex justify-between">
        <div>
          <h3 class="text-sm text-gray-700">
            <a :href="props.product.href">
              <span aria-hidden="true" class="absolute inset-0" />
              {{ props.product.name }}
            </a>
          </h3>
          <p class="mt-1 text-sm text-gray-500">{{ props.product.color }}</p>
        </div>
        <p class="text-sm font-medium text-gray-900">{{props.product.currency}}{{ props.product.price }}</p>
      </div>
    </div>
    <Button @click="addToCart">Add to Cart</Button>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted } from "vue";
import {useCartStore} from '../store/cart'
import {storeToRefs} from 'pinia'
const Button = defineAsyncComponent(
  () => import(/*webpackChunkName:'button'*/ "./Button.vue")
);

interface Product {
  imageSrc: string;
  imageAlt: string;
  href: string;
  name: string;
  color: string;
  currency: string;
  price: string;
  id: number
}

const props = defineProps<{
  product: Product;
}>();


const cartStore = useCartStore()
const {cart} = storeToRefs(cartStore)
onMounted(()=>{
    cartStore.loadCartInstance()
})

function addToCart(){
    cartStore.addToCart({id: props.product.id, qty:1})
    console.log("cart", cart.value)
}   


</script>
