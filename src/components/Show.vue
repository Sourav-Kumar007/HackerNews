 <!-- typescript add korte hobe -->

<script setup>
import nestedComment from './nestedComment.vue';

import { timeCal } from './composables/usetime';
import { useRoute } from 'vue-router';
import { commentId } from './composables/usetime';
import { RouterLink } from 'vue-router';
import Nav from './nav.vue';
import axios from 'axios';
import { onMounted, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
let res, tempArr;
const obj = ref({});
const currentPage = ref(0);
const route = useRoute();
const footerOption = ref([]);
const curr = ref(1);
const total = ref(0);
const isLoading = ref(true);
const commentShow = ref(false);
const arr = ref([]);
const fetchApi = async () => {
    const api = await axios.get(`https://hacker-news.firebaseio.com/v0/${route.params.stories}.json`);
    res = api.data;
    console.log(route.params.stories);
};

const commentHide = (index) => {
    const obj = footerOption.value[index];
    footerOption.value = [];
    footerOption.value.push(obj);
    commentShow.value = true;
    arr.value = footerOption.value[0].kids;
    console.log('nested comment show korte hbe ');
};

watch(route, () => {
    
    curr.value = 1;
    commentHide.value = false;
    console.log('dukse watcher e ' , commentHide.value);
});
watch([currentPage, route], async () => {
    arr.value = [];
    commentHide.value = false;
    isLoading.value = true;
    await fetchApi();
    isLoading.value = false;
    total.value = Math.ceil(res.length / 25);
    tempArr = res.slice(currentPage.value, currentPage.value + 25);
    footerOption.value = [];
    tempArr.forEach(async (id) => {
        try {
            obj.value = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const { time, when } = timeCal(obj.value.data.time);
            footerOption.value.push({
                title: `${obj.value.data.title}`,
                score: `${obj.value.data.score}`,
                by: `by ${obj.value.data.by}`,
                comments: obj.value.data.descendants !== undefined && obj.value.data.descendants !== 0 ? `${obj.value.data.descendants} Comments` : ``,
                created: `Created ${time} ${when} ago`,
                slash: `|`,
                url: obj.value.data.url,
                kids: obj.value.data.kids === undefined ? [] : obj.value.data.kids,
                id: obj.value.data.id,
            });
        } catch (error) {
            console.error('error in fetching show.vue ', error);
        }
    });
}, { immediate: true });

function backPage() {
    if (currentPage.value !== 0) {
        currentPage.value -= 25;
        curr.value = Math.floor(currentPage.value / 25) + 1;
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
            <div v-for="(item, index) in footerOption" :key="item.id" @click="random" v-show="!isLoading">
                <div class="card">
                    <div class="title">
                        <a v-show="footerOption[index].url !== undefined" :href="footerOption[index].url"
                            target="_blank"> {{
                                footerOption[index].title
                            }}</a>
                        <p v-show="footerOption[index].url === undefined" class="titleBar"> {{ footerOption[index].title
                        }}
                        </p>
                    </div>
                    <div class="footerOption">
                        <div>{{ footerOption[index].score }}</div>
                        <div>{{ footerOption[index].slash }}</div>
                        <div>{{ footerOption[index].by }}</div>
                        <div>{{ footerOption[index].slash }}</div>
                        <div v-show="footerOption[index].comments.length !== 0" @click="commentHide(index)" class="end">
                           {{ footerOption[index].comments }} 

                        </div>
                        <div v-show="footerOption[index].comments.length !== 0">{{ footerOption[index].slash }}</div>
                        <div>{{ footerOption[index].created }}</div>
                    </div>
                </div>
            </div>
            <div v-for="x in 25" v-show="isLoading" class="card">
                <div>
                    <h3>Loading...</h3>
                </div>

                <div class="loadTop">
                    <div>
                        Loading...
                    </div>
                    <div>
                        |
                    </div>
                    <div>
                        Loading...
                    </div>
                    <div>
                        |
                    </div>
                    <div>
                        Loading...
                    </div>
                </div>

            </div>
            <!-- Card shes -->
        </div>
        <div class="btn">
            <button @click="backPage"> <i class="fa fa-arrow-circle-left" style="font-size:35px;color:red"></i>
            </button>
            <p> {{ curr }} of {{ total }}</p>
            <button @click="forwarPage"> <i class="fa fa-arrow-circle-right" style="font-size:35px;color:red"></i>
            </button>
        </div>
    </main>

    <div v-if="commentShow"> 
        <div class="Card">
            <nestedComment class="hard" v-for="item in arr" :key="item" :commentId="item" />
        </div>
    </div>
</template>

<style>
.loadTop {
    display: flex;
    flex-direction: colum;
    justify-content: space-between;
    width: 40%;
}

.card {
    display: flex;
    min-height: 95px;
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

.footerOption {
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

.nested {
    margin-left: 20px;
    margin-right: 0px;
}

.end {
    cursor: pointer;
}

.hard {
    display: flex;
    width:65%;
    min-height: 120px;
    overflow: hidden;
    box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: .1s;
    background-color: #F9FAFA;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 20px;
    box-sizing: border-box;
    padding: 10px;
    border: 2px solid transparent;
    margin-right: 0px;
    margin: 0 auto;
}
.top{
    display: flex;
    width: 30%;
    justify-content: space-between;
}
</style>