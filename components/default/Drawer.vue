<template>
    <!--
    Sidomenyn som används i mobilt läge.
    -->
    <ul class="sidenav" id="sidenav-1">
        <h5>Navigation</h5>
        <div class="divider"></div>
        <li> 
            <router-link class="waves-effect" to="/" v-on:click.native="closeDrawer"><i class="small material-icons">local_parking</i>Politiknörden</router-link>
            <router-link class="waves-effect" to="/tweetmap" v-on:click.native="closeDrawer"><i class="small material-icons">map</i>TweetMap</router-link>
            <router-link class="waves-effect" to="/om" v-on:click.native="closeDrawer"><i class="small material-icons">group</i>Om Oss</router-link>
        </li>
    </ul>
</template>

<script>
module.exports = {
    methods: {
        closeDrawer: function() {
            $('.sidenav').sidenav('close');
        }
    }
};
</script>

<style>
h5 {
    margin-left: 30px;
}
</style>