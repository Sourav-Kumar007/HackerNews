<script setup>
import { RouterLink,RouterView } from 'vue-router';
import { ref } from 'vue';

// const changeColor = (index)=>{
//     store.commit('setColor' , index);
// };
</script>

<template>
    <div class="container">
       <div class="head">
        <header>
            <div class="headerContent">
                <RouterLink to="/topstories"> HackerNews </RouterLink>
            </div>
            <div class="options">
                <div ><a href="/newstories"> New </a></div>
                <div ><a href="/beststories" > Best </a></div>
                <div ><a href="/showstories"> Show </a></div>
                <div ><a href="/askstories"> Ask </a></div>
                <div ><a href="/jobstories"> Job </a></div>
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
