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
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
let res, tempArr;
const obj = ref({});
const currentPage = ref(0);
const route = useRoute();
const footerOption = ref([]);
const curr = ref(1);
const total = ref(0);

const fetchApi = async () => {
    const api = await axios.get(`https://hacker-news.firebaseio.com/v0/${route.params.stories}.json`);
    res = api.data;
};

watch(route , ()=>{
    console.log('dukse');
    curr.value = 1;
});
watch([currentPage, route], async () => {
    console.log('eta teo dukse');
    await fetchApi();
    total.value = Math.ceil(res.length / 25);
    tempArr = res.slice(currentPage.value, currentPage.value + 25);
    footerOption.value = [];
    tempArr.forEach(async (id) => {
        obj.value = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        store.commit('timeCal', obj.value.data.time);
        footerOption.value.push({
            title: `${obj.value.data.title}`,
            score: `${obj.value.data.score}`,
            by: `by ${obj.value.data.by}`,
            comments: obj.value.data.descendants !== undefined && obj.value.data.descendants !== 0 ? `${obj.value.data.descendants} Comments` : ``,
            created: `Created ${store.state.time} ${store.state.when} ago`,
            slash: `|`,
            url: obj.value.data.url,
            kids: obj.value.data.kids === undefined ? [] : obj.value.data.kids,
        });
    });
    store.commit('setopt', footerOption);
}, { immediate: true });

function backPage() {
    if (currentPage.value !== 0) {
        currentPage.value -= 25;
        curr.value = Math.floor(currentPage.value / 25) + 1;
        console.log('back currpage ' , currentPage.value);
        console.log('back currcnt ' , curr.value);
    }
}

function forwarPage() {
    if (currentPage.value < res.length) {
        currentPage.value += 25;
        curr.value = Math.floor(currentPage.value / 25) + 1;
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <Nav />
    <br>
    <main class="par">
        <div>
            <Card />
        </div>
        <div class="btn">
            <button @click="backPage"> <i class="fa fa-arrow-circle-left" style="font-size:35px;color:red"></i>
            </button>
            <p> {{ curr }} of {{ total }}</p>
            <button @click="forwarPage"> <i class="fa fa-arrow-circle-right" style="font-size:35px;color:red"></i>
            </button>
        </div>
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

.titleBar {
    font-size: 20px;
    color: #4D606D;
    font-weight: 400;
}

.footerOpt {
    width: 68%;
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

.btn {
    display: flex;
    justify-content: center; 
    align-items: center; 
    margin-top: 20px; 
    gap: 10px; 
}

</style>