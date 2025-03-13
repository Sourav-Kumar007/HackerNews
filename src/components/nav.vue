<script setup>
import { RouterLink,RouterView } from 'vue-router';
</script>

<template>
    <div class="container">
        <header>
            <div class="headerContent">
                <h2> HackerNews </h2>
            </div>
            <div class="options">
                <RouterLink active-class="active" class="bg" to="/newstories"> New </RouterLink>
                <span> Best </span>
                <span> Show </span>
                <span> Ask </span>
                <RouterLink active-class="active" class="bg" to="/jobstories"> Job </RouterLink>
            </div>
        </header>
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
main{
    width:60%;
    margin : 0 auto;
}
header .options {
    display: flex;
    gap: 15px; 
}
.bg{
    text-decoration: none;
    color: black;
}
.active{
    text-decoration: underline;

}
</style>
