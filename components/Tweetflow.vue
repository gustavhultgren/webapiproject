<template>
    <div>
        <nav>
            <div class="nav-wrapper blue">
                <a href="#" class="brand-logo center">Tweets</a>
            </div>
        </nav>
        <div id="twitter-flow">
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
    name:'Tweetflow',
    props:['tweettag'],
    data: function(){
        return {
            tweets:null
        }
    },
    mounted: function(){
        axios
            .get("http://localhost:5000/tweets/" + this.tweettag)
            .then(res => {
                this.tweets = res.data.tweets
            });
    }
};
</script>

<style>
</style>