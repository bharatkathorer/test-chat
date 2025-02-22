import {createRouter, createWebHistory} from 'vue-router'
import AdminRouter from "@/router/adminRouter";
import userRouter from "@/router/userRouter";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...AdminRouter,
        ...userRouter
    ]
})


router.beforeEach((to, from, next) => {
    let isAuthenticated = false;
    // let userRole = 'user';
    if (localStorage.getItem('admin_token')) {
        isAuthenticated = true;
        // userRole = 'admin';
    } else if (localStorage.getItem('user_token')) {
        isAuthenticated = true;
        // userRole = 'user';
    }


    if (to.meta.requiresAuth && !isAuthenticated) {
        if (to.meta.role == 'admin') {
            next({name: 'admin-login'})
        } else {
            next({name: 'login'})
        }
    } else {
        next();
    }

    // else if (isAuthenticated && !to.meta.requiresAuth) {
    //     if (userRole == 'admin') {
    //         next({name: 'admin'});
    //     } else {
    //         next({name: 'welcome'});
    //     }
    // }
})

export default router
