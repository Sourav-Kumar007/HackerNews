<script setup>
import axios from 'axios';
import store from './store/store';
import { defineProps, ref } from 'vue';
const props = defineProps({ commentId: Number });
const commentInfo = ref({});
const kids = ref([]);
const showKids = ref(false);
const fetchData = async () => {
    const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${props.commentId}.json`);
    commentInfo.value = res.data;
    store.commit('timeCal' , res.data.time);
};
fetchData();
const toggleComments = async()=>{
    if(showKids.value){
        showKids.value = false;
        return ;
    }
    showKids.value = true;
    if(commentInfo.value.kids){
        const responses = await Promise.all(
            commentInfo.value.kids.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
        );
        kids.value = responses.map(res => res.data.id);
    }
};
</script>

<template>
    <div>
        <div class="top">
            <div> by {{ commentInfo.by}}</div>
            <div> | </div>
            <div> Created {{ store.state.time }} {{ store.state.when }} ago </div>
        </div>
        <div class="middle" v-if="commentInfo.text">
            <div v-html="commentInfo.text"></div>
        </div>
        <div v-if="commentInfo.kids" class="end" @click="toggleComments">
            {{ showKids ? `Hide Comments [-]` : `Show Comments [+${commentInfo.kids.length}]` }}
        </div>
        <div v-if="showKids" class="nested">
            <nestedComment class="card" v-for="item in kids" :key="item" :commentId="item"/>
        </div>
    </div>

</template>

<style>
.nested {
    margin-left: 20px;
    margin-right: 0px;
}
.end{
    cursor: pointer;
}
</style>