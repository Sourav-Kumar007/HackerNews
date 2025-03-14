<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const footerOpt = computed(() => store.state.kids);
</script>
<template>
    <h1> hello </h1>
    <!-- <div class="footerOpt">
        <div>{{ footerOpt[index].score }}</div>
        <div>{{ footerOpt[index].slash }}</div>
        <div>{{ footerOpt[index].by }}</div>
        <div>{{ footerOpt[index].slash }}</div>
        <div v-show="footerOpt[index].comments.length !== 0" @click="passKids(footerOpt[index].kids)">
            <RouterLink to="/Comment">{{ footerOpt[index].comments }}</RouterLink>
        </div>
        <div v-show="footerOpt[index].comments.length !== 0">{{ footerOpt[index].slash }}</div>
        <div>{{ footerOpt[index].created }}</div>
    </div> -->
</template>