import { createStore } from 'vuex'

export default createStore({
  state: {
    kids: [],
    footerOpt: [],
    index: 0,
    time: 0,
    when:'day',
    isLoading: true,
  },
  mutations:{
    setTrue(state){
        state.isLoading = true;
    },
    setFalse(state){
        state.isLoading = false;
    },
    setkids(state , payload){
        state.kids = payload;
    },
    setopt(state , payload){
        state.footerOpt = [];
        state.footerOpt = payload;
    },
    setindex(state , payload){
        state.index = payload;
    },
    timeCal(state , Unix) {
        let second = Date.now();
        second /= 1000;
        second = Math.floor(second);
        second -= Unix;
        if (second < 60) {
            state.time = second;
            state.when = 'seconds';
        }
        else if ((second / 60) < 60) {
            state.time = Math.floor(second / 60);
            state.when = state.time == 1 ? 'minute' : 'minutes';
        }
        else if ((second / (60 * 60)) < 24) {
            state.time = Math.floor(second / 3600);
            state.when = state.time == 1 ? 'hour' : 'hours';
        }
        else {
            state.time = Math.floor(second / (3600 * 24));
            state.when = state.time == 1 ? 'day' : 'days';
        }
    }
  }
});
