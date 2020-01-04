<template>
    <div id="riksdag" class="section container">
        <div class="row col s12">
            <div class="input-field col s12">
                <i class="material-icons prefix">search</i>
                <input id="ledamot_search" type="text" v-model="ledamot_search" />
                <label for="ledamot_search" class>Sök efter ledamöter</label>
            </div>
        </div>
        <div class="row">
            <ul class="collapsible">
                <li>
                    <div class="collapsible-header">
                        <i class="material-icons">filter_list</i>Filter
                        <span
                            class="new badge"
                            data-badge-caption="aktiva"
                            v-if="selected_parties.length > 0"
                        >{{selected_parties.length}}</span>
                    </div>
                    <div class="collapsible-body">
                        <h5>Filter</h5>
                        <div class="divider"></div>
                        <form class="section">
                            <li :key="index" v-for="(checkbox, index) in checkboxOptions">
                                <label>
                                    <input
                                        type="checkbox"
                                        v-model="selected_parties"
                                        :value="checkbox.parti"
                                    />
                                    <span>{{ checkbox.text }}</span>
                                </label>
                            </li>
                        </form>
                    </div>
                </li>
            </ul>
        </div>
        <transition name="fade">
            <div v-if="response == false" class="row center">
                <div class="preloader-wrapper medium active">
                    <div class="spinner-layer spinner-blue-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <transition-group name="list" tag="div" class="row" id="ledamot-container">
            <div
                v-for="ledamot in 
                    limitBy( //begränsa på grund av prestandaproblem
                        orderBy( //sortera och filtrera
                            filterBy(filterItems, ledamot_search, 'sorteringsnamn'),
                        'parti'),
                    50)"
                class="list-item col s12 m6 l4"
                v-bind:class="ledamot.parti"
                v-bind:id="ledamot.intressent_id"
                :key="ledamot.intressent_id"
            >
            <router-link :to="'/riksdagen/ledamot/' + ledamot.intressent_id+'/'"> 
                <div class="card medium hoverable">
                    <div class="card-image z-depth-2">
                        <img :src="ledamot.bild_url_192" />
                    </div>
                    <div class="card-content">
                        <p class="card-title">
                            {{ledamot.tilltalsnamn}} {{ledamot.efternamn}}
                            <strong>({{ledamot.parti}})</strong>
                        </p>
                        <span class="black-text">Aktiva Tweets: ???</span>
                    </div>
                </div>
            </router-link>
            </div>
        </transition-group>
    </div>
</template>

<script>
module.exports = {
    name: 'Riksdagen',
    mixins: [Vue2Filters.mixin],
    props: ["data", "response"],
    data: function() {
        return {
            checkboxOptions: [
                { text: "Miljöpartiet", parti: "MP" },
                { text: "Sverigedemokraterna", parti: "SD" },
                { text: "Vänsterpartiet", parti: "V" },
                { text: "Socialdemokraterna", parti: "S" },
                { text: "Kristdemokraterna", parti: "KD" },
                { text: "Moderaterna", parti: "M" },
                { text: "Liberalerna", parti: "L" },
                { text: "Centerpartiet", parti: "C" },
                { text: "Avhoppare", parti: "-" }
            ],
            selected_parties: [],
            ledamot_search: "",
            selected_ledamot: ""
        };
    },
    beforeCreate() {
        $(document).ready(function() {
            //Instans av kollaps-element från MaterializeCSS. Används just nu för att gömma/dölja sökfilterna
            $(".collapsible").collapsible();
        });
    },
    computed: {
        filterItems: function() {
            var vm = this;
            var category = vm.selected_parties;

            if (category.length < 1) {
                return vm.data;
            } else {
                return vm.data.filter(person => {
                    var matchFilter = false;
                    category.forEach(entry => {
                        if (category.includes(person.parti)) {
                            matchFilter = true;
                        }
                    });
                    return matchFilter;
                });
            }
        }
    }
};
</script>

<style scoped>
.list-item .card-image {
    height: 200px;
    top: 15px;
    margin: auto;
    width: 200px;
    overflow: visible;
}

.list-item .card-image > img {
    object-fit: cover;
    object-position: top;
    height: 200px;
    border-radius: 50px;    
}

.card-image {
    border-radius: 50px;
}

.card-content {
    text-align: center;
    color: black;
}

.list-item > .card {
    border-radius: 5px;
    overflow: hidden;
}
.list-item {
    /* övergång med anpassad hastighetsfördelning (cubic-bezier) */
    transition: all 0.3s cubic-bezier(0.865, 0.84, 0.24, 1);
}
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.list-leave-active {
    position: absolute;
}
</style>