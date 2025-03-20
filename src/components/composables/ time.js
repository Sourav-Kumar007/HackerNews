import store from "../store/store";

export function timeCal(Unix){
    let second = Date.now();
    second /= 1000;
    second = Math.floor(second);
    second -= Unix;
    if (second < 60) {
        store.dispatch('setTime' , second);
        store.dispatch('setWhen' , 'seconds');
    }
    else if ((second / 60) < 60) {
        store.dispatch('setTime' , Math.floor(second / 60));
        let when = store.getters.getTime == 1 ? 'minute' : 'minutes';
        store.dispatch('setWhen' , when);
    }
    else if ((second / (60 * 60)) < 24) {
        store.dispatch('setTime' , Math.floor(second / 3600));
        let when = store.getters.getTime == 1 ? 'hour' : 'hours';
        store.dispatch('setWhen' , when);
    }
    else {
        store.dispatch('setTime' ,Math.floor(second / (3600 * 24)));
        let when = store.getters.getTime == 1 ? 'day' : 'days';
        store.dispatch('setWhen' , when);
    }
}