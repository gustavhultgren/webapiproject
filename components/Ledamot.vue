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
            <div class="card grey lighten-4 z-depth-2 hoverable">
                <div class="card-content row">
                     <div class="col s12 m4 center">
                        <img
                            class="center z-depth-1"
                            id="ledamot_image"
                            v-bind:src="ledamot.bild_url_192"
                        />        
                    </div>
                    <div class="col s12 m7">
                        <div class="row">
                            <div class="divider"></div>
                            <div class="section">
                                  <div class="row">
                                    <div class="col s12 m12">
                                        <div class="card-panel">
                                            <p><b>Parti:</b> {{ledamot.parti}}</p>
                                            <p><b>Valkrets:</b> {{ledamot.valkrets}}</p>
                                            <p><b>Status:</b> {{ledamot.status}}</p>
                                            <p><b>Född:</b> {{ledamot.fodd_ar}}</p>
                                            <p><b>Kön:</b> {{ledamot.kon}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="divider"></div>
                        </div>
                    </div>
                    <div class="col s12 m12 l12">
                        <div class="card-title s12 m12 center">Vad säger människor på twitter om {{ledamot.tilltalsnamn}} {{ledamot.efternamn}}?</div>
                        <div class="divider"></div>
                    </div>
                    <div class="row center">
                        <div class="list-item col s12 m6 l3">
                            <div class="card-panel light-blue lighten-5 z-depth-1">
                                <div class="row">
                                    <div class="col s2">
                                    <img src="exempel.png" alt="Profilbild" class="circle responsive-img">
                                    </div>
                                    <div class="col s12 left-align">
                                        <div class="divider"></div>
                                        <span class="black-text">Exempel tweet från en twitter användare #politiknörden</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            ledamot: null
        };
    },
    mounted() {
        //GET-request till API, lagrar svar i info
        axios
            .get(
                "https://data.riksdagen.se/personlista/?iid=" +
                    this.$route.params.id +
                    "&utformat=json"
            )
            .then(res => (this.ledamot = res.data.personlista.person));
    }
};
</script>

<style scoped>
.ledamot_profile {
    min-height: 100vh;
}
</style>