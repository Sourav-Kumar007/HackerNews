import { createStore } from "vuex";

export default createStore({
  state: {
    kids: [],
    footerOpt: [],
    index: 0,
    time: 0,
    when: "day",
    isLoading: true,
    story: "",
    flag: [true, false, false, false, false, false],
  },
  mutations: {
    setColor(state, index) {
      state.flag = [false, false, false, false, false, false];
      state.flag[index] = true;
    },
    setStory(state, payload) {
      state.story = payload;
    },
    setTrue(state) {
      state.isLoading = true;
    },
    setFalse(state) {
      state.isLoading = false;
    },
    setkids(state, payload) {
      state.kids = payload;
    },
    setopt(state, payload) {
      state.footerOpt = payload;
    },
    setindex(state, payload) {
      state.index = payload;
    },
    setTime(state, payload) {
      state.time = payload;
    },
    setWhen(state, payload) {
      state.when = payload;
    },
  },
  actions: {
    setColor({ commit }, payload) {
      commit("setColor", payload);
    },
    setStory({ commit }, payload) {
      commit("setStory", payload);
    },
    setTrue({ commit }) {
      commit("setTrue");
    },
    setFalse({ commit }) {
      commit("setFalse");
    },
    setkids({ commit }, payload) {
      commit("setkids", payload);
    },
    setopt({ commit }, payload) {
      commit("setopt", payload);
    },
    setindex({ commit }, payload) {
      commit("setindex", payload);
    },
    setTime({ commit }, payload) {
      commit("setTime", payload);
    },
    setWhen({ commit }, payload) {
      commit("setWhen", payload);
    },
  },
  getters: {
    getKids: (state) => state.kids,
    getFooterOptions: (state) => state.footerOpt,
    getIndex: (state) => state.index,
    getTime: (state) => state.time,
    getWhen: (state) => state.when,
    isLoading: (state) => state.isLoading,
    getStory: (state) => state.story,
    getFlag: (state) => state.flag,
    getFlagByIndex: (state) => (index) => state.flag[index],
  },
});
