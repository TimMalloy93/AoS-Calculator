<template>
  <div >
  <router-view/>
</div>
<footer>This application is a fan-made tool for personal use, not intended for commercial or profit purposes. 
  All intellectual property, including game mechanics, names, and images, are the property of Games Workshop, and this application is not endorsed or affiliated with them in any way.</footer>
</template>

<style lang="scss">
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
  overflow: hidden; /* Prevent scrolling */
}

#app {
  position: relative;
  min-height: 100vh;
}

router-view {
  padding-bottom: 50px; /* Adjust based on the footer height */
  height: calc(100vh - 50px); /* Ensure the main content fills the available space */
  overflow-y: auto; /* Allow content scrolling inside this section if necessary */
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
  height: 50px; /* Set an appropriate height */
}

</style>
