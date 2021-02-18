<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url('./assets/home-background.jpg');
  background-size: cover;
  filter: blur(0.02rem);
  backdrop-filter: blur(5px);
}
</style>
