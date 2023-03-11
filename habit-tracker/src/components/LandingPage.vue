<template>
  <div class="landing-page">
    <div class="text">
      <h1>Habit Tracker</h1>
      <p>Achieve your goals by tracking your habits.</p>
      <p>
        With Habit Tracker, you can:
      <ul>
        <li><span>Set monthly goals for your habits 🎯</span></li>
        <li><span>Track your progress and see how close you are to achieving your goals 🏆</span></li>
        <li><span>Track your To Do's 📃</span></li>
        <li><span>Get reminders to help you stay on track ⏰</span></li>
        <li><span>Stay motivated with a rewards system by earning xp, levels and badges 🎮</span></li>
      </ul>
      </p>
      <button @click="startTracking">Start Tracking</button>
    </div>
  </div>
 
 





</template>

<script>
import { useRouter } from 'vue-router'


export default {
  setup() {
    const router = useRouter()

    const startTracking = () => {
      router.push({ name: 'LoginForm' })
    }


    return { startTracking }
  },

}
</script>

<style>
.landing-page {
  text-align: center;
  padding: 20px;
  font-family: sans-serif;
  color: #333;
  background-color: #f5f5f5;
  margin-top: 30px;
}

h1 {
  font-size: 36px;
  margin-bottom: 10px;
  color: #4caf50;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
  line-height: 1.5;
  padding: 0 20px;
}

ul {
  margin-top: 20px;
  list-style-type: none;
  padding: 0 20px;
}

</style>


