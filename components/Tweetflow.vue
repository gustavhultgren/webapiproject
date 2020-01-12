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
    props: ["tweettag"],
    data: function() {
        return {
            tweets: null,
            response:false
        };
    },
    mounted: function() {
        axios.get("http://127.0.0.1:5000/tweets/" + this.tweettag).then(res => {
            this.tweets = res.data.tweets;
            this.response = true;
        });
    }
};
</script>

<style scoped>
#twitter-flow {
    height: 300px;
    overflow-y: auto;
}
</style>