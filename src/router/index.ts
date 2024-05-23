import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:"/",
            name:"home",
            component:()=>import("@/views/home/index.vue")
        },
        {
            path:"/home",
            name:"home",
            component:()=>import("@/views/home/index.vue")
        },
        {
            path:"/login",
            name:"login",
            component:()=>import("@/views/login/index.vue")

        },
        {
            path:"/admin",
            name:'admin',
            component:()=>import("@/admin/home/index.vue"),
        },
        {
            path:"/about",
            name:'about',
            component:()=>import("@/views/about/index.vue"),
        },
        {
            path:"/album",
            name:'album',
            component:()=>import("@/views/album/index.vue"),
        },
        {
            path:"/documt",
            name:'documt',
            component:()=>import("@/views/documt/index.vue"),
        },
        {
            path:"/set",
            name:'set',
            component:()=>import("@/views/set/index.vue"),
        },
        {
            path:"/article",
            name:'article',
            component:()=>import("@/views/article/index.vue"),
        },
        {
            path:"/",
            redirect:"/home"
        }
    ]
}) 

export default router