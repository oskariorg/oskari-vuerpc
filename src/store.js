import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // rpcExample: {
    //   desc: '',
    //   func: ''
    // },
    rpcExample: '',
    examplesViewed: [],
    channelLogs: [{}],
    map: null,
    savedPlotAreaData: null,
    savedZoom: null
  },
  getters: {
    selectedExample (state) {
      return state.rpcExample;
    },
    totalViewed (state) {
      return state.examplesViewed;
    },
    getLogs (state) {
      return state.channelLogs;
    },
    getPreviousZoom (state) {
      return state.zoom;
    }
  }
});
