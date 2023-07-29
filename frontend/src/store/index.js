import Vue from 'vue';
import Vuex from 'vuex';
import moduleApp from "./modules/app";
import moduleVideo from "./modules/video";
import moduleSeasonBracket from "./modules/seasonbracket";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app: moduleApp,
        video: moduleVideo,
        seasonbracket: moduleSeasonBracket
    }
});

export default store;
