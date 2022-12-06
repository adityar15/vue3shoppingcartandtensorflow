<template>
  <div class="grid place-items-center h-96">
    <!-- <div class="flex justify-between items-center">
      <Title>Products</Title>
      <router-link to="/cart"> <Button>Cart</Button> </router-link>
    </div>

    <div
      class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div> -->

  <Counter />

  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Counter = defineAsyncComponent(
  () => import(/*webpackChunkName:"counter"*/ "../components/Counter.vue")
);

// import products from "../../products.json";
// const Title = defineAsyncComponent(
//   () => import(/*webpackChunkName:"title"*/ "../components/Title.vue")
// );
// const ProductCard = defineAsyncComponent(
//   () =>
//     import(/*webpackChunkName:"productcard"*/ "../components/ProductCard.vue")
// );

// const Button = defineAsyncComponent(
//   () => import(/*webpackChunkName:"button"*/ "../components/Button.vue")
// );
</script>
