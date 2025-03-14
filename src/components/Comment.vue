<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import { watch } from 'vue';
import axios from 'axios';
import Nav from './nav.vue';

const store = useStore();
const comments = computed(() => store.state.kids);
const index = computed(() => store.state.index);
const footerOpt = computed(() => store.state.footerOpt);
const allComment = ref([]);
const fetchApi = () => {
    console.log('fetch api');
    comments.value.forEach(async id => {
        const api = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        allComment.value.push(api.data);
    });
};
onMounted(() => {
    if (comments.value) {
        fetchApi();
        
    }
});
watch(index, (newIndex) => {
    console.log("Index changed:", newIndex);
});
</script>

<template>
    <Nav />
    <div class="upore">
        <div class="card"  v-if="footerOpt[index]">
                <div class="title">
                    <a v-show="footerOpt[index].url !== undefined" :href="footerOpt[index].url" target="_blank" > {{ footerOpt[index].title
                        }}</a>
                        <p v-show="footerOpt[index].url === undefined" class="titleBar">  {{ footerOpt[index].title }}</p>
                </div>
                <div class="footerOpt">
                    <div>{{ footerOpt[index].score }}</div>
                    <div>{{ footerOpt[index].slash }}</div>
                    <div>{{ footerOpt[index].by }}</div>
                    <div>{{ footerOpt[index].slash }}</div>
                    <div>{{ footerOpt[index].created }}</div>
                </div>
            </div>
    </div>
    <br>

    <main>
        <div class="Gap">
            <div class="card" v-for="(item, index) in allComment">
                <div class="top">
                    <div> by {{ item.by }}</div>
                    <div> | </div>
                    <div> {{ item.time }}</div>
                </div>
                <div class="middle">
                    <div v-html="item.text"></div>
                </div>
                <div class="end">
                    <div>Show Comments [+?] </div>
                </div>
            </div>
        </div>
    </main>
</template>


<style scoped>
.upore{
    width:65%;
    margin:0 auto;
}
.card {
    display: flex;
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
}
.Gap{
    display: flex;  
    flex-direction: column;  
    gap: 5px; 
}
.top{
    display: flex;
    width: 20%;
    justify-content: space-between;
}
</style>