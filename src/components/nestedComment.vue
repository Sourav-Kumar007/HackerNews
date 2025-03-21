<script setup>
import axios from 'axios';
import { defineProps, ref } from 'vue';
import { timeCal } from './composables/usetime';
const props = defineProps({ commentId: Number });
const commentInfo = ref({});
const kids = ref([]);
const showKids = ref(false);
const flag = ref(true);
const Time = ref(0);
const When = ref('');
const fetchData = async () => {
    try {
        const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${props.commentId}.json`);
        commentInfo.value = res.data;
        const { time, when } = timeCal(res.data.time);
        Time.value = time;
        When.value = when;
        flag.value = false;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};
fetchData();
const toggleComments = async () => {
    if (showKids.value) {
        showKids.value = false;
        return;
    }
    showKids.value = true;
    if (commentInfo.value.kids) {
        try {
            const responses = await Promise.all(
                commentInfo.value.kids.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
            );
            kids.value = responses.map(res => res.data.id);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }
};
</script>

<template>
    <div class="Gap">
        <div class="top">
            <div v-if="!flag"> by {{ commentInfo.by }}</div>
            <div v-if="flag"> Loading... </div>
            <div> | </div>
            <div v-if="!flag"> Created {{ Time }} {{ When }} ago </div>
            <div v-if="flag"> Loading... </div>
        </div>
        <div class="middle">
            <div v-html="commentInfo.text" v-if="!flag"></div>
            <div v-if="flag"> Loading... </div>
        </div>
        <div v-if="commentInfo.kids" class="end" @click="toggleComments">
            {{ showKids ? `Hide Comments [-]` : `Show Comments [+${commentInfo.kids.length}]` }}
        </div>
        <div v-if="showKids">
            <nestedComment class="nested" v-for="item in kids" :key="item" :commentId="item" />
        </div>
    </div>

</template>

<style scoped>

.nested {
    width: 98%;
    /* margin-left: 15px;
    margin-right: 0px; */
    padding: 10px;
    gap : 15px;
    box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: .1s;
    min-height: 120px;
    overflow: hidden;
}
.Gap {
    display: flex;
    flex-direction: column;
    gap: 18px;
}
.end {
    cursor: pointer;
}
</style>