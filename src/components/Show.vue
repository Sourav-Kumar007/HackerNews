<!-- ekhane amra je id ta pacchi seta story er ,
ekhon amra ei id theke oi particular story er 
sob comment pabo, then amra prottek ta comment er
id k call dibo ar comment gula arekta component e show korbo
ar ekhane theke just comment er id ta pathay dibo -->

<script setup>
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import Card from './Card.vue';
import Nav from './nav.vue';
import axios from 'axios';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
let res, tempArr;
const obj = ref({});
const currentPage = ref(0);
const route = useRoute();
const footerOption = ref([]);

const fetchApi = async () => {
    const api = await axios.get(`https://hacker-news.firebaseio.com/v0/${route.params.stories}.json`);
    res = api.data;
};

watch([currentPage, route], async () => {
    await fetchApi();
    tempArr = res.slice(currentPage.value, currentPage.value + 25);
    footerOption.value = [];
    tempArr.forEach(async (id) => {
        obj.value = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        store.commit('timeCal' , obj.value.data.time);
        footerOption.value.push({
            title: `${obj.value.data.title}`,
            score: `${obj.value.data.score}`,
            by: `by ${obj.value.data.by}`,
            comments: obj.value.data.descendants !== undefined &&  obj.value.data.descendants !== 0? `${obj.value.data.descendants} Comments` : ``,
            created: `Created ${store.state.time} ${store.state.when} ago`,
            slash: `|`,
            url: obj.value.data.url,
            kids : obj.value.data.kids === undefined ? [] : obj.value.data.kids,
        });
    });
    store.commit('setopt' , footerOption);
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
    <Nav />
    <br>
    <main>
        <Card/>
        <button @click="backPage"> Back </button>
        <button @click="forwarPage"> Forward </button>
    </main>
</template>

<style>
.card {
    display: flex;
    min-height: 100px;
    overflow: hidden;
    box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: .1s;
    background-color: #F9FAFA;
    flex-direction: column;
    justify-content: space-evenly;
}
.titleBar{
    font-size: 20px;
    color : #4D606D;
    font-weight: 400;
}
.footerOpt {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
    box-shadow: 2px 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>