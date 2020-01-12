<template>
    <div>
        <header class="section">
            <div class="row">
                <div class="col s1 left-align">
                    <router-link
                        to="/riksdagen"
                        class="btn-floating btn-medium brown lighten-1 waves-effect"
                    >
                        <i class="material-icons">arrow_back</i>
                    </router-link>
                </div>
            </div>
        </header>
        <main class="container">
            <div class="row">
                <div class="col s12 m12 center">
                    <h5 class="promo-caption">TweetMap</h5>
                    <p class="promo-caption">Vad säger folk på twitter om politiker runt om Sverige?</p>
                    <div class="divider"></div>
                    <google-map 
                        class="z-depth-3"
                        name="example">
                    </google-map>
                    <div class="divider"></div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
module.exports = {
    name: 'TweetMap',
    components: {
        GoogleMap
    },
};
</script>

<style>
</style>