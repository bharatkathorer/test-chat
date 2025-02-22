import "../../utils/axios";
import axios from "axios";
import {cartStore} from "@/stores/cartStore";

const store = cartStore();
export const ProductService = {
    products: async () => {
        try {
            return await axios.get('/products');
        } catch (e) {
            return e;
        }
    },

    carts: async () => {
        try {
            return await axios.get('/carts');
        } catch (e) {
            return e;
        }
    },

    addToCart: async (productId) => {
        try {
            return await axios.post('add-cart', {product_id: productId});
        } catch (e) {
            return e;
        }
    },

    removeToCart: async (productId) => {
        try {
            return await axios.post('remove-cart', {product_id: productId});
        } catch (e) {
            return e;
        }
    },

    checkout: async () => {
        try {
            return await axios.post('checkout');
        } catch (e) {
            return e;
        }
    },

    orders: async () => {
        try {
            return await axios.post('orders');
        } catch (e) {
            return e;
        }
    },

    cartUpdate: async (items) => {
        const user = store.user;
        user.carts.items = items;
        localStorage.setItem('front_user', JSON.stringify(user));
        store.$patch({
            user: user
        })
    }
}



