<template>
    <div id="main">
        <Navbar></Navbar>
        <Drawer></Drawer>
        <transition :name="transitionName">
            <!-- keep-alive cachar routes tillstånd även om användaren byter till andra routes.
            Just nu endast riksdagen pga att filtren ska sparas för användarens upplevelse -->
            <keep-alive include="Riksdagen">
                <!-- data och response skickas med till routes -->
                <router-view :key="$route.fullPath" tag="div" id="main-content" :data="data" :response="response"/>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
module.exports = {
    data: function(){
        return{
            data:'',
            response:false
        }
    },
    components: {
        Navbar,
        Drawer,
        Footer1
    },
    watch: { // Väljer animation beroende på om djupet på URL:en är. Ger en känsla av att man går fram och tillbaka.
        $route(to, from) {
            const toDepth = to.path.split("/").length;
            const fromDepth = from.path.split("/").length;
            this.transitionName =
                toDepth < fromDepth ? "slide-right" : "slide-left";
        }
    },
    mounted() {
        //GET-request till API, lagrar svar i info
        axios
            .get("http://localhost:5000/ledamoter")
            .then(res => {
                this.onResponse(res); // Kallar på onResponse vid svar från API
            });
    },
    methods: {
        onResponse: function(res) {
            this.data = res.data.ledamoter.splice(0, 349); //begränsa antalet ledamöter
            this.response = true;
        }
    }
};
</script>
<style scoped>
#main{
    overflow-x: hidden;
}
#main-content{
    height: 100%; /*För att sidan inte ska hoppa vid övergångar*/
}

/* fade-övergång för routade element i <transition>-taggar (router-views) */
.slide-right-enter-active,
.slide-right-leave-active {
    transition: 0.3s cubic-bezier(0.19, 1, 0.62, 1);
}

.slide-right-enter-active {
    transition-delay: 0.3s;
    height: 0;
}

.slide-right-enter {
    opacity: 0;
    transform: translateX(-300px);
}
.slide-right-leave-active {
    transform: translateX(300px);
    opacity: 0;
    height: 0;
}

/* fade-animation för element i <transition>-taggar (router-views) */
.slide-left-enter-active,
.slide-left-leave-active {
    transition: 0.3s cubic-bezier(0.19, 1, 0.62, 1);
}

.slide-left-enter-active {
    transition-delay: 0.3s;
    height: 0;
}

.slide-left-enter {
    opacity: 0;
    transform: translateX(300px);
}
.slide-left-leave-active {
    opacity: 0;
    transform: translateX(-300px);
    height: 0;
}
</style>