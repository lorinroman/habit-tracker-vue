<template>
  <form @submit.prevent="handleSubmit">
    <span class="material-icons arrow-go-landingpage" @click="goToLandingPage">
      arrow_circle_left
    </span>
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error" >{{ error }}</div>
    <button>Sign up</button>

  </form>

  <p>Already have an account? <span class="linkspan" @click="goToLogin">Log in</span></p>
</template>
  
<script>
import { useRouter } from 'vue-router'
import axiosInstance from '../axiosInstance'
import { ref } from 'vue'
export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const displayName = ref('')
    const error = ref('')

  

    const handleSubmit = async () => {
      const user = {
        displayName: displayName.value,
        email: email.value,
        password: password.value
      };
   
      try {

        const res = await axiosInstance.post('/user/signup', user);
        console.log(res.data);
        router.push({ name: 'LoginForm' })

      } catch (e) {
        error.value = "Error creating user."
        console.log(e);
      }
      
    }


    const router = useRouter()

    const goToLandingPage = () => {
      router.push({ name: 'LandingPage' })
    }

    const goToLogin = () => {
      router.push({ name: 'LoginForm' })
    }

    return { email, password, displayName, handleSubmit, goToLogin, goToLandingPage }

  }
}
</script>