<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
let res, tempArr, time, when;
const stories = ref([]);
const currentPage = ref(0);
const text = ref([]);

function timeCal(Unix) {
    let second = Date.now();
    second /= 1000;
    second = Math.floor(second);
    second -= Unix;
    console.log('seconds ' , second);
    if (second < 60) {
        time = second;
        when = 'seconds';
    }
    else if((second / 60) < 60){
        time = Math.floor(second / 60);
        when = time == 1 ? 'minute' : 'minutes';
    }
    else if((second / (60 * 60)) < 24){
        time = Math.floor(second / 3600);
        when = time == 1 ? 'hour' : 'hours';
    }
    else {
        time = Math.floor(second / (3600 * 24));
        when = time == 1 ? 'day' : 'days';
    }
}
const fetchApi = async () => {
    const api = await axios.get("https://hacker-news.firebaseio.com/v0/newstories.json");
    res = api.data;
};

watch(currentPage, async () => {
    await fetchApi();
    tempArr = res.slice(currentPage.value, currentPage.value + 25);
    stories.value = [];
    text.value = [];
    tempArr.forEach(async (id) => {
        console.log('haha');
        const obj = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        stories.value.push(obj.data);
        let tempText = `  ${obj.data.score}   |   by ${obj.data.by}`;
        if (obj.data.kids) {
            tempText += `   |   ${obj.data.kids.length} Comments`;
        }
        timeCal(obj.data.time);
        tempText += `   |    Created ${time} ${when} ago`;
        text.value.push(tempText);
    });
}, { immediate: true });

function backPage() {
    if (currentPage.value !== 0) {
        currentPage.value -= 25;
    }
}

function forwarPage() {
    if (currentPage.value < res.length) {
        currentPage.value += 25;
    }
}
</script>

<template>
    <br>
    <br>
    <div v-for="(item, index) in stories" :key="item.id" @click="random">
        <div class="card">
            <div class="title">
                <a :href="item.url" target="_blank"> {{ item.title }}</a>
            </div>
            <div>
                <p class="preserve-space"> {{ text[index] }}</p>
            </div>
        </div>
    </div>
    <button @click="backPage"> Back </button>
    <button @click="forwarPage"> Forward </button>
</template>

<style>
.preserve-space {
    white-space: pre;
}

.card {
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    background-color: #F9FAFA;
}

.title a {
    font-size: 20px;
}

a:link {
    text-decoration: none;
    color: blue;
}

a:visited {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

a:active {
    text-decoration: underline;
}

.card .title {
    padding: 1px;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>