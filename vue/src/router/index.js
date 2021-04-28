import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode:"hash",
    routes: [
        { 
            path:'/',
            component:()=>import('../components/Layout'),
            meta:{ selected: '/'},
            children:[
                { path:'menu',component:()=>import('../components/menu/index'), meta:{ selected: '/menu'}},
                { path:'menu/add',component:()=>import('../components/menu/info'), meta:{ selected: '/menu'} },
                { path:'menu/:id',component:()=>import('../components/menu/info'), meta:{ selected: '/menu'},},
                { path:'role',component:()=>import('../components/role/index.vue'), meta:{ selected: '/role'} },
                { path:'role/add',component:()=>import('../components/role/info'), meta:{ selected: '/role'} },
                { path:'role/:id',component:()=>import('../components/role/info'), meta:{ selected: '/role'},},
            ]
        }
    ]
})
