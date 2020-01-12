<!-- 
Komponent för twitterflöde.
Flödet renderas ej förrän response blir sann.
En laddningsanimation visas tills dess.
-->
<template>
    <div>
        <nav v-if="response == true">
            <div class="nav-wrapper blue">
                <a href="#" class="brand-logo center">Tweets</a>
            </div>
        </nav>
        <div v-if="response == false" class="progress blue lighten-2">
            <div class="indeterminate blue"></div>
        </div>
        <div v-if="response == true" id="twitter-flow">
            <div
                v-for="tweet in tweets"
                :key="tweet.postedAt"
                class="card blue lighten-5 list-item col s12"
            >
                <div class="row card-content">
                    <div class="col valign-wrapper">
                        <img
                            :src="tweet.profileImageURL"
                            alt="Profilbild"
                            class="circle avatar tweet-profile"
                        />
                        <span class="flow-text">@{{tweet.userName}}</span>
                    </div>
                    <div class="col s12 left-align">
                        <div class="divider"></div>
                        <span class="black-text">{{tweet.tweetText}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    name: "Tweetflow",
    props: ["tweettag"], //Twitter-taggen måste skickas med till komponenten så att flödet kan hämtas
    data: function() {
        return { //fördefinierade variabler
            tweets: null,
            response:false
        };
    },
    mounted: function() { //Körs när komponenten laddas in. Hämtar tweets och säger till när det är klart
        axios.get("http://localhost:5000/tweets/" + this.tweettag).then(res => {
            this.tweets = res.data.tweets;
            this.response = true;
        });
    }
};
</script>

<style scoped>
#twitter-flow { /* Twitter-flödet visas som en egen ruta med egen scrollbar*/
    max-height: 400px;
    overflow-y: auto;
}
.tweet-profile {
    height: 40px;
    width: 40px;
    object-fit: cover;
    object-position: top;
    margin: 0 10px 7px;
}
</style>