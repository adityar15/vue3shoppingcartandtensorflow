import { defineStore } from "pinia";
import {v4 as uuid4} from 'uuid'
import {Cart, Product, DisplayCart} from '../types/interfaces'
import productData from '../../products.json'

interface State{
    cart: Cart | {},
    displayCart: DisplayCart[] | []
}

export const useCartStore = defineStore('cart',{
    state: ()=>({cart: {}, displayCart: []} as State),
    actions:{
        loadCartInstance()
        {
            const cs = localStorage.getItem('cart')
            if(!cs)
            this.cart = {}
            else
            this.cart = JSON.parse(cs)
        },
        addToCart(product: Product){
            const cs = localStorage.getItem('cart')

            let isAdded = false

            if(!cs)
            this.cart = {
                cid: uuid4(),
                products:[
                    product
                ]
            }
            else {
                let cartLocalStorage = JSON.parse(cs)
                cartLocalStorage.products = cartLocalStorage.products.map((ci : Product) => {
                    if(ci.id == product.id)
                    {
                        isAdded = true
                        return {id: ci.id, qty: ci.qty + 1}
                    }

                    return {id: ci.id, qty: ci.qty}
                })

                if(!isAdded)
                cartLocalStorage.products.push({id: product.id, qty: product.qty})

                this.cart = cartLocalStorage
               

            }

            localStorage.setItem('cart', JSON.stringify(this.cart))

        },
        
        removeFromCart(id:number){
                (this.cart as Cart).products = (this.cart as Cart).products.filter(ci => ci.id != id) 
                this.displayCartLoad()
                localStorage.setItem('cart', JSON.stringify(this.cart))
        },


        displayCartLoad(){
            this.displayCart = (this.cart as Cart).products.map(ci => {
                const requiredProduct = productData.filter(p => p.id == ci.id)
                // if(requiredProduct[0].stock >= ci.qty)
                return {
                    id:ci.id, name: requiredProduct[0].name, price: requiredProduct[0].price, qty: ci.qty, color: requiredProduct[0].color,
                    currency: requiredProduct[0].currency, inStock: requiredProduct[0].stock >= ci.qty ? true : false }
            })

        }

    }
})