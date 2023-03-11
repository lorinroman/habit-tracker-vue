<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/logo.png" />
            <h1><router-link class="routerLink" :to="{ name: 'HomeView' }">Habit Tracker</router-link></h1>
            <div class="links">
                <button>Profile</button>
                <button @click="handleClick">Logout</button>
            </div>
        </nav>
    </div>
</template>
  
<script>

import {useRouter} from 'vue-router'

export default {
    setup(){
        
        const router = useRouter()

        const handleClick = async () =>{
            localStorage.removeItem('token');
            router.push({name:'LandingPage'})
        }

        return {handleClick}
    }
}
</script>
  
<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}

nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

nav img {
    max-height: 60px;
}

nav h1 {
    
    margin-left: 20px;
}

nav .links {
    margin-left: auto;
}

nav .routerLink{
    color:#4caf50;
}

nav .links a,
button {
    margin-left: 16px;
    font-size: 14px;
}
</style>