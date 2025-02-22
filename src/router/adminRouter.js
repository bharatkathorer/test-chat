const auth = {
    requiresAuth: true,
    role: 'admin'
};
const guest = {
    requiresAuth: false,
    role: 'admin'
};
const adminRouter = [

    {
        path: '/admin/login',
        name: 'admin-login',
        meta: guest,
        component: () => import('../views/Admin/Auth/LoginPage.vue')
    },
    //Category
    {
        path: '/admin/category',
        name: 'category',
        meta: auth,
        component: () => import('../views/Admin/Category/Index.vue')
    },
    {
        path: '/admin/category/create',
        name: 'category-create',
        meta: auth,
        component: () => import('../views/Admin/Category/Create.vue')
    },
    {
        path: '/admin/category/edit/:_id',
        name: 'category-edit',
        meta: auth,
        component: () => import('../views/Admin/Category/Create.vue')
    },

    //Product
    {
        path: '/admin/product',
        name: 'product',
        meta: auth,
        component: () => import('../views/Admin/Product/Index.vue')
    },
    {
        path: '/admin/product/create',
        name: 'product-create',
        meta: auth,
        component: () => import('../views/Admin/Product/Create.vue')
    },
    {
        path: '/admin/product/edit/:_id',
        name: 'product-edit',
        meta: auth,
        component: () => import('../views/Admin/Product/Create.vue')
    },

     //orders
    {
        path: '/admin/orders',
        name: 'admin-orders',
        meta: auth,
        component: () => import('../views/Admin/Order/Index.vue')
    },

    {
        path: '/admin/orders/view/:_id',
        name: 'order-view',
        meta: auth,
        component: () => import('../views/Admin/Order/View.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        meta: auth,
        component: () => import('../views/Admin/DashboardPage.vue')
    }


];

export default adminRouter
