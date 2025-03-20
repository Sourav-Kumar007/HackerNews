<script setup>
import axios from 'axios';
import { defineProps, ref } from 'vue';
const props = defineProps({ commentId: Number });
const commentInfo = ref({});
const kids = ref([]);
const showKids = ref(false);
const flag = ref(true);
const fetchData = async () => {
    try{
        const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${props.commentId}.json`);
    commentInfo.value = res.data;
    // store.commit('timeCal' , res.data.time);
    flag.value = false;
    }catch(error){
        console.error('Error fetching data: ' , error);
    }
};
fetchData();
const toggleComments = async()=>{
    if(showKids.value){
        showKids.value = false;
        return ;
    }
    showKids.value = true;
    if(commentInfo.value.kids){
       try{
        const responses = await Promise.all(
            commentInfo.value.kids.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
        );
        kids.value = responses.map(res => res.data.id);
       }catch(error){
        console.error('Error fetching data: ' , error);
       }
    }
};
</script>

<template>
    <!-- <div>
        <div class="top">
            <div v-if="!flag"> by {{ commentInfo.by}}</div>
            <div v-if="flag"> Loading... </div>
            <div> | </div>
            <div v-if="!flag" > Created {{ store.state.time }} {{ store.state.when }} ago </div>
            <div v-if="flag"> Loading... </div>
        </div>
        <div class="middle">
            <div v-html="commentInfo.text" v-if="!flag"></div>
            <div v-if="flag"> Loading... </div>
        </div>
        <div v-if="commentInfo.kids" class="end" @click="toggleComments">
            {{ showKids ? `Hide Comments [-]` : `Show Comments [+${commentInfo.kids.length}]` }}
        </div>
        <div v-if="showKids" class="nested">
            <nestedComment class="card" v-for="item in kids" :key="item" :commentId="item"/>
        </div>
    </div> -->

</template>

<style scoped>
.nested {
    margin-left: 20px;
    margin-right: 0px;
}
.end{
    cursor: pointer;
}
</style>