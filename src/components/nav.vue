<script setup>
import { RouterLink,RouterView } from 'vue-router';
import { ref } from 'vue';
import store from './store/store';
// const flag = ref([false,false,false,false,false,false]);
const changeColor = (index)=>{
    store.commit('setColor' , index);
};
</script>

<template>
    <div class="container">
       <div class="head">
        <header>
            <div class="headerContent" @click="changeColor(0)" :class="store.state.flag[0] ? 'bg' : ''">
                <RouterLink to="/topstories"> HackerNews </RouterLink>
            </div>
            <div class="options">
                <div @click="changeColor(1)" :class="store.state.flag[1] ? 'bg' : ''"><RouterLink to="/newstories"> New </RouterLink></div>
                <div @click="changeColor(2)" :class="store.state.flag[2] ? 'bg' : ''"><RouterLink to="/beststories"> Best </RouterLink></div>
                <div @click="changeColor(3)" :class="store.state.flag[3] ? 'bg' : ''"><RouterLink to="/showstories"> Show </RouterLink></div>
                <div @click="changeColor(4)" :class="store.state.flag[4] ? 'bg' : ''"><RouterLink to="/askstories"> Ask </RouterLink></div>
                <div @click="changeColor(5)" :class="store.state.flag[5] ? 'bg' : ''"><RouterLink to="/jobstories"> Job </RouterLink></div>
            </div>
        </header>
       </div>
    </div>
    <main>
        <RouterView/>
    </main>
    <footer>

    </footer>
</template>

<style>

.container {
    width: 100%;
    height: 70px;
    background-color: #FD8B00;
}

header {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
}
.headerContent{
    margin-top: 20px;
    font-size: 20px;
}
main{
    width:65%;
    margin : 0 auto;
}
header .options {
    display: flex;
    gap: 15px; 
    margin-top: 20px;
}
.bg{
    padding:3px;
    background-color: rgb(47, 220, 233);
}

</style>
