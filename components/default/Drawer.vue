<template>
    <ul class="sidenav" id="sidenav-1">
        <h5>Navigation</h5>
        <div class="divider"></div>
        <li>
            <router-link class="waves-effect" to="/"><i class="small material-icons">local_parking</i>Politiknörden</router-link>
            <router-link class="waves-effect" to="/tweetmap"><i class="small material-icons">map</i>TweetMap</router-link>
            <router-link class="waves-effect" to="/om"><i class="small material-icons">group</i>Om Oss</router-link>
        </li>
    </ul>
</template>

<script>
module.exports = {};
</script>

<style>
h5 {
    margin-left: 30px;
}
</style>