<!-- this page is for showing all the stories related to specific types such as best stories , newstories, topstories like that -->

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const store = useStore();
const footerOpt = computed(() => store.state.footerOpt);
function passKids(arr, index) {
    store.commit('setkids', arr);
    store.commit('setindex', index);
}
console.log();
</script>
<template>
    <div v-for="(item, index) in footerOpt" :key="item.id" @click="random" v-show="!store.state.isLoading">
        <div class="card">
            <div class="title">
                <a v-show="footerOpt[index].url !== undefined" :href="footerOpt[index].url" target="_blank"> {{
                    footerOpt[index].title
                    }}</a>
                <p v-show="footerOpt[index].url === undefined" class="titleBar"> {{ footerOpt[index].title }}</p>
            </div>
            <div class="footerOpt">
                <div>{{ footerOpt[index].score }}</div>
                <div>{{ footerOpt[index].slash }}</div>
                <div>{{ footerOpt[index].by }}</div>
                <div>{{ footerOpt[index].slash }}</div>
                <div v-show="footerOpt[index].comments.length !== 0" @click="passKids(footerOpt[index].kids, index)">
                    <RouterLink :to="`/${store.state.story}/${item.id}/comment`">{{ footerOpt[index].comments }}</RouterLink>
                </div>
                <div v-show="footerOpt[index].comments.length !== 0">{{ footerOpt[index].slash }}</div>
                <div>{{ footerOpt[index].created }}</div>
            </div>
        </div>
    </div>
    <div v-for="x in 25" v-show="store.state.isLoading" class="card">
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
</template>

<style scoped>
.loadTop {
    display: flex;
    flex-direction: colum;
    justify-content: space-between;
    width: 40%;
}
</style>