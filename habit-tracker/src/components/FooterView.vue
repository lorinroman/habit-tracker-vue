<template>
    <footer class="footer">
      <div class="container">
        <p class="text-center">This is a project for personal use only &copy; {{ currentYear }} Habit Tracker</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterView',
    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    }
  }
  </script>
  
  <style>
  .footer {
    color: #fff;
    padding: 20px;
  }
  
  .footer p {
    margin: 0;
    font-size: 14px;
  }
  </style>
  