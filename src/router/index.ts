import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";



const routes : Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: ()=>import(/*webpackChunkName:"home"*/ '../pages/Home.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: ()=>import(/*webpackChunkName:"cart"*/ '../pages/Cart.vue')
    },
    {
        path: '/metamasklogin',
        name: 'MetamaskLogin',
        component: ()=>import(/*webpackChunkName:"metamask"*/ '../pages/MetaMask.vue')
    },
    {
        path: '/webcam',
        name: 'Webcam',
        component: ()=>import(/*webpackChunkName:"webcam"*/ '../pages/Webcam.vue')
    }
] 

export const router = createRouter({
    history: createWebHistory(),
    routes
})

