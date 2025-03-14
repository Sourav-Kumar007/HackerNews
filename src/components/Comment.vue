<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import Nav from './nav.vue';
const store = useStore();
const comments = computed(() => store.state.kids);
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
        console.log(comments.value);
    }
});
</script>

<template>
    <Nav />
    <main>
        <div>
            <div class="card" v-for="(item, index) in allComment">
                <div class="title">
                    {{ comments }}
                </div>
                <div>
                    {{ item.by }}
                </div>
                <div>
                    Footer
                </div>
            </div>
        </div>
    </main>
</template>


<style scoped>
.card {
    display: flex;
    min-height: 120px;
    overflow: hidden;
    box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: .1s;
    background-color: #F9FAFA;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 15px;
}
</style>