import {defineStore} from 'pinia';

export const cartStore = defineStore({
    id: 'cartStore', state: () => ({
        user: JSON.parse(localStorage.getItem('front_user') ?? '[]') ?? [],
    }),

    persist: {
        enabled: true
    }

})
