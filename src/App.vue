
<template>
 

  <router-view/>

<footer>This application is a fan-made tool for personal use, not intended for commercial or profit purposes. 
  All intellectual property, including game mechanics, names, and images, are the property of Games Workshop, and this application is not endorsed or affiliated with them in any way.</footer>
</template>

<script>


export default{
  name: 'App',

};

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-height: 100vh;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* prevents scrolling in full screen */
}

#app {
  position: relative;
  min-height: 100vh;
}

router-view {
  padding-bottom: 50px; 
  height: calc(100vh - 50px); 
  overflow-y: auto; 
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
  height: 50px; 
}
@media (max-width: 767px) {
  html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto; /* enables scrolling in smaller windows */
}
footer {
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
  height: 50px; 

  
}

}
</style>
