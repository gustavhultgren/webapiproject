<template>
    <div>
        <header class="section">
            <div class="row">
                <div class="col s1 left-align">
                    <router-link
                        to="/riksdagen"
                        class="btn-floating btn-medium brown lighten-1 waves-effect">
                        <i class="material-icons">arrow_back</i>
                    </router-link>
                </div>
            </div>
        </header>
        <main class="container">
            <div class="row">
                <div class="col s12 m12 center">
                    <i class="medium material-icons">group</i>
                    <p class="promo-caption">TweetMap</p>
                    <p class="light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ratione corrupti assumenda vel. Itaque, quis, nobis eius tenetur incidunt quidem distinctio earum dolor, ullam ex cumque sed. Doloribus, error rerum?</p>
                    <google-map
                    name="example"
                    ></google-map>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

module.exports = {
  components: {
    GoogleMap
  },

  computed: {
  },
}
</script>

<style>
.karta {
    height: 180px;
}
</style>