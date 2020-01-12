<template>
    <div class="ledamot_profile">
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
                <div class="col s12 l5 xl4">
                    <nav>
                        <div class="nav-wrapper brown lighten-1">
                            <a href="#" class="brand-logo center">Profil</a>
                        </div>
                    </nav>
                    <div class="card grey lighten-4 z-depth-2">
                        <div class="card-content row">
                            <div class="col s12 m6 l12 center">
                                <img
                                    class="center"
                                    id="ledamot_image"
                                    v-bind:src="ledamot.bild_stor"
                                />
                            </div>
                            <div class="col s12 m6 l12">
                                <div class="row">
                                    <div class="card-panel">
                                        <p class="card-title">{{ledamot.namn}}</p>
                                        <p>
                                            <b>Parti:</b>
                                            {{ledamot.parti}}
                                        </p>
                                        <p>
                                            <b>Valkrets:</b>
                                            {{ledamot.valkrets}}
                                        </p>
                                        <p>
                                            <b>Status:</b>
                                            {{ledamot.status}}
                                        </p>
                                        <p>
                                            <b>Född:</b>
                                            {{ledamot.fodd}}
                                        </p>
                                        <p>
                                            <b>Kön:</b>
                                            {{ledamot.kon}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col s12 l7 xl8">
                    <nav>
                        <div class="nav-wrapper red lighten-2">
                            <a href="#" class="brand-logo center">TweetMap</a>
                        </div>
                    </nav>
                    <div class="card grey lighten-4 z-depth-2">
                        <div class="card-content">
                            <div class="row">
                                <google-map :TweetTag="ledamot.tagg"></google-map> <!-- Tweettag skickas med till GoogleMap-komponenten-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="twitter-flow-container center-align">
                <Tweetflow :TweetTag="ledamot.tagg" class="col s12 l7 xl8 offset-l5 offset-xl4"></Tweetflow>
            </div>
        </main>
    </div>
</template>

<script>
module.exports = {
    components: {
        GoogleMap,
        Tweetflow
    },
    props: ["data"],
    data: function() {
        return {
            tweets: null
        };
    },
    computed: {
        // Genererar 'ledamot'-variabel för den besökta ledamoten. Loopar genom data-prop:en och jämför ledamöter med ledamot-id i URL:en
        ledamot: function() {
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].id == this.$route.params.id) {
                    return this.data[i];
                    break;
                }
            }
        }
    }
};
</script>

<style scoped>
.ledamot_profile {
    /* För att sidan inte ska hoppa i sidled */
    min-height: 100vh;
}
</style>