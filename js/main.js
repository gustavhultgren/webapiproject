Vue.use(VueRouter)
const Main = window.httpVueLoader('components/Main.vue')
const Riksdagen = window.httpVueLoader('components/Riksdagen.vue')
const Navbar = window.httpVueLoader('components/default/Navbar.vue')
const Drawer = window.httpVueLoader('components/default/Drawer.vue')
const Footer1 = window.httpVueLoader('components/default/Footer1.vue')
const Ledamot = window.httpVueLoader('components/Ledamot.vue')
const About = window.httpVueLoader('components/OmOss.vue')
const Karta = window.httpVueLoader('components/TweetMap.vue')
const GoogleMap = window.httpVueLoader('components/GoogleMap.vue')

Vue.use(Vue2Filters)

const router = new VueRouter({
    mode: 'hash',
    base:'/',
    routes: [
        {
            path: '/riksdagen',
            component: Riksdagen,
            alias: '/',
            /* children:[
                {
                    path: '/ledamot/:id',
                    component: Ledamot,
                },
            ] */
        },
        {
            path: '/riksdagen/ledamot/:id',
            component:Ledamot
        },
        {
            path: '/riksdagen/om',
            component:About
        },
        {
            path: '/tweetmap',
            component:Karta
        }
    ]
})

new Vue({
    router,
    el: '#app',
    components: {
        Main
    },
    template: '<Main></Main>'
})