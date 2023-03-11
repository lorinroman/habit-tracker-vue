<template>
  <form @submit.prevent="handleSubmit">
    <span class="material-icons arrow-go-landingpage" @click="goToLandingPage">
      arrow_circle_left
    </span>
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button>Log in</button>

  </form>

  <p>Don't have an account? <span class="linkspan" @click="goToSignUp">Sign up</span></p>
</template>
  
<script>
import { useRouter } from 'vue-router'
import axiosInstance from '../axiosInstance'
import { ref } from 'vue'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')

    const handleSubmit = async () => {
      const user = {
        email: email.value,
        password: password.value
      };


      try {
        const res = await axiosInstance.post('/user/signin', user);
        console.log(res.data);
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          router.push({ name: 'HomeView' })
       
        }

      } catch (e) {
        const err = e.response;
        if (err.status === 404) {
            error.value = "User not found";
          } else {
            if (err.status === 400) {
              error.value = "Incorrect credentials";
            } else {
              if (err.status === 500) {
                error.value = "Internal server error";
              }
            }
      }


      }
    }
    const router = useRouter()

    const goToLandingPage = () => {
      router.push({ name: 'LandingPage' })
    }

    const goToSignUp = () => {
      router.push({ name: 'SignupForm' })
    }

    return { email, password, handleSubmit, error, goToSignUp, goToLandingPage }

  }
}

</script>

<style>
.arrow-go-landingpage {
  cursor: pointer;
  float: left;
}

form {
  margin-top: 30px;
}
</style>