import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#470919',
                secondary: '#5B0822',
                indigo: '#11142D'
            },
            dark: {
                primary: '#470919',
                secondary: '#5B0822',
                indigo: '#11142D'
            },
        },
    },
});
