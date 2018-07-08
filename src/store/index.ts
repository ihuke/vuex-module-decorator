import Vue from "vue";
import Vuex from "vuex";
import root from "./counter";
import board from "./board";

Vue.use(Vuex);
export default new Vuex.Store({
  ...root,
  modules: {
    board
  }
});
