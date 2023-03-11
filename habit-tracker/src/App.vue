<template>
  <router-view/>
  <div id="footer">
    <FooterView/>
  </div>

 
</template>

<script>

import FooterView from './components/FooterView.vue';

export default {
  name: 'App',
  components: { 
    FooterView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

#footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
