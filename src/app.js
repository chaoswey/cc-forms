import Vue from 'vue';
import ccInputs from './components/cc-inputs.vue'

const app = new Vue({
    "el": "#app",
    components: {ccInputs},
    data: {
        result: []
    },
    created: function () {
        if (window.source !== undefined) {
            this.result = window.source;
        }
    },
    methods: {
        handleData: function (data) {
            this.result = data;
        }
    }
});