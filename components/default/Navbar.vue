<template>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper brown lighten-1">
                <a href="#" data-target="sidenav-1" class="sidenav-trigger">
                    <i class="material-icons">menu</i>
                </a>
                <router-link tag="a" class="brand-logo" to="/">Politiknörden</router-link>
                <ul class="right hide-on-med-and-down">
                    <ul id="nav-mobile" class="right hide-on-small-and-down">
                        <li class="waves-effect">
                            <router-link 
                                class="btn tooltipped dark brown" 
                                data-position="bottom" 
                                data-tooltip="TweetMap" 
                                tag="a" to="/tweetmap">TweetMap
                            <i class="medium material-icons right">map</i></router-link>
                        </li>
                        <li class="waves-effect">
                            <router-link 
                                class="btn tooltipped dark brown" 
                                data-position="bottom" 
                                data-tooltip="Om Oss" 
                                tag="a" to="/om">Om Oss
                            <i class="medium material-icons right">group</i></router-link>
                        </li>
                        <li class="waves-effect">
                            <router-link 
                                class="btn dark brown" 
                                tag="a" to="/">Politiknörden
                            <i class="medium material-icons right">local_parking</i></router-link>
                        </li>
                    </ul>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
module.exports = {
    mounted() {
        //jQuery för att skapa sidenav-instans
        $(document).ready(function() {
            $(".sidenav").sidenav();
        },
          $(document).ready(function(){
            $('.tooltipped').tooltip();
        }));
    }
};
</script>

<style scoped>
.brand-logo {
    margin-left: 10px;
}
</style>