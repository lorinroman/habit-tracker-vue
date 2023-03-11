<template>
  <NavbarView></NavbarView>
  <HabitList :user="user"></HabitList>
</template>

<script>

import NavbarView from './NavbarView.vue'
import axiosInstance from '../axiosInstance'
import HabitList from './HabitList.vue';
//import { ref } from 'vue'
//import { watchEffect } from 'vue';
import { reactive } from 'vue';



export default {
  components: {
    NavbarView,
    HabitList
  },
  setup() {

    const state = reactive({
      user: null,
    });



    //const user = ref(null);
    const token = localStorage.getItem('token');



    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axiosInstance.get(`/user`, {
            headers: {
              Authorization: token,
            }
          });
          state.user = res.data;

        } catch (error) {
          console.error(error);
        }
      }
    };



    fetchUser()

    console.log(state.user)

    return { ...state };
  }
}
</script>
  
<style>

</style>