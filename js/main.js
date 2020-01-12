/*
Registrerar alla komponenter. Vi använder ett plugin, HTTPVueLoader,
för att kunna använda oss utav Vue:s single file components utan
webpack och node.
*/
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
const Tweetflow = window.httpVueLoader('components/Tweetflow.vue')

Vue.use(Vue2Filters) // importerar Vue2Filters-biblioteket för effektiv filtrering av json

const router = new VueRouter({
    mode: 'hash', // historik-metod för routes. hash används för att snabbare utveckling och undvika extra konfigurering av webbserver.
    base: '/',
    routes: [ //definierar routes och vilken komponent som hör till.
        {
            path: '/riksdagen',
            component: Riksdagen,
            alias: '/',
        },
        {
            path: '/riksdagen/ledamot/:id', //:id-delen av sökvägen skickas ner till komponenten för att identifiera en ledamot
            component: Ledamot
        },
        {
            path: '/om',
            component: About
        },
        {
            path: '/tweetmap',
            component: Karta
        }
    ]
})

new Vue({ //Skapar Vue-instansen.
    router,
    el: '#app',
    components: {
        Main
    },
    template: '<Main></Main>'
})