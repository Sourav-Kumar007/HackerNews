
export function timeCal(Unix){
    let second = Date.now();
    second /= 1000;
    second = Math.floor(second);
    second -= Unix;
    let time , when;
    if (second < 60) {
        time = second;
        when = 'seconds';
    }
    else if ((second / 60) < 60) {
        time = Math.floor(second / 60);
        when = time == 1 ? 'minute' : 'minutes';
    }
    else if ((second / (60 * 60)) < 24) {
        time = Math.floor(second / 3600)
        when = time == 1 ? 'hour' : 'hours';
    }
    else {
        time = Math.floor(second / (3600 * 24))
        when = time == 1 ? 'day' : 'days';
    }
    return {time , when};
}

export function commentId(arr){
    const comments = ref(arr);
}