<!-- ekhane comments array er moddhe particular story er joto gula 
comment thakbe segular id store hoye thakbe -->

<script setup>
import { defineProps } from 'vue';
import nestedComment from './nestedComment.vue';
import { computed, onMounted, ref } from 'vue';
import { watch } from 'vue';
import axios from 'axios';
import Nav from './nav.vue';
const Time = ref([]);
// const store = useStore();
// const comments = computed(() => store.getters.getKids);
// const index = computed(() => store.getters.getIndex);
// const footerOpt = computed(() => store.getters.getFooterOptions);

// watch(index, (newIndex) => {
//     console.log("Index changed:", newIndex);
// });

const props = defineProps({
    arr: Array,
    index: Number,
    footerOpt: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
haha
    <div>
        <!-- <div class="upore">
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
    </div> -->
    <br>

    <main>
        <div class="Gap">
            <nestedComment class="card" v-for="item in arr" :key="item" :commentId="item"/>
        </div>
    </main>
    </div>
</template>


<style >
.upore {
    width: 65%;
    margin: 0 auto;
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
    margin-right: 0px;
}

.Gap {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.top {
    display: flex;
    width: 30%;
    justify-content: space-between;
}
</style>