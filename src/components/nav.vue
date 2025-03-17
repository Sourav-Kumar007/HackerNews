<script setup>
import { RouterLink,RouterView } from 'vue-router';

</script>

<template>
    <div class="container">
       <div class="head">
        <header>
            <div class="headerContent">
                <RouterLink active-class="active" class="bg" to="/topstories"> HackerNews </RouterLink>
            </div>
            <div class="options">
                <RouterLink active-class="active" class="bg" to="/newstories"> New </RouterLink>
                <RouterLink active-class="active" class="bg" to="/beststories"> Best </RouterLink>
                <RouterLink active-class="active" class="bg" to="/showstories"> Show </RouterLink>
                <RouterLink active-class="active" class="bg" to="/askstories"> Ask </RouterLink>
                <RouterLink active-class="active" class="bg" to="/jobstories"> Job </RouterLink>
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
    text-decoration: none;
    color: black;
}
.active{
    text-decoration: underline;

}
</style>
