import { createStore } from 'vuex'

export default createStore({
  state: {
    kids: [],
    footerOpt: [],
  },
  mutations:{
    setkids(state , payload){
        state.kids = payload;
    },
    setopt(state , payload){
        state.footerOpt = [];
        state.footerOpt = payload;
    },
  }
});
