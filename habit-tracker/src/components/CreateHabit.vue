<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create new Habit</h4>
        <input type="text" required placeholder="Habit title..." v-model="title">
        <textarea required placeholder="Habit description..." v-model="description"></textarea>
        <label>Difficulty: </label>
        <select v-model="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        <div class="error"></div>
        <button id="create-button">Create</button>
    </form>
</template>

<script>

import { ref } from 'vue'
export default {
    setup() {
        const title = ref('')
        const description = ref('')
        const difficulty = ref('')

        const handleSubmit = () => {
           
        }

        return { title, description, handleSubmit, difficulty }
    }
}
</script>

<style>
  form {
    background: white;
  }
  
  label{
    font-size: 14px;
    float:left;
  }

  select{
    float:left;
    margin-left: 5px;
  }

  #create-button {
    display: block;
    margin-top: 60px;
    margin-left: 170px;
  }
</style>