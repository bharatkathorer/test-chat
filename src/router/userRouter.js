const auth = {
    requiresAuth: true,
    role: 'user'
};
const guest = {
    requiresAuth: false,
    role: 'user'
};
const userRouter = [
    {
        path: '/login',
        name: 'login',
        meta: guest,
        component: () => import('../views/User/Auth/Login.vue')
    },
    {
        path: '/chat',
        name: 'chat',
        meta: guest,
        component: () => import('../views/Chat.vue')
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/User/Welcome.vue'),
        meta: guest
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/HomeView.vue'),
        meta: auth
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/User/Cart/Index.vue'),
        meta: auth
    },
    {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/User/Order/Index.vue'),
        meta: auth
    },
    {
        path: '/about',
        name: 'about',
        meta: guest,
        component: () => import('../views/AboutView.vue')
    },
]


export default userRouter
