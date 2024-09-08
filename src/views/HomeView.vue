<template>
  <div id="container">
  <div class="home">
    <img alt="AoS Logo" src="../assets/AoSlogo.jpg">
  </div>
    <calculator id="calc"/>
    <div id="l-aside">
      <img class="pic" src="../assets/AoSGenHandbookOrder_Feature1nd.jpg" alt="order">
      <img class="pic" src="../assets/AoSGenHandbook-Destruction_Feature1tp.jpg" alt="Destruction">
    </div>
    <div id="r-aside">
      <img class="pic" src="../assets/AoSGenHandbook-Chaos_Feature1gr.jpg" alt="chaos">
      <img class="pic" src="../assets/AoSGenHandbookDeath_Feature.jpg" alt="death">
    </div>
  </div>
 
</template>

<script>
// @ is an alias to /src
import calculator from '@/components/home.vue'

export default {
  name: 'HomeView',
  components: {
    calculator
  }
}
</script>

<style>
#container {
  display: grid;
  grid-template-columns: 1fr; /* Single column layout by default */
  grid-template-areas:
    "home"
    "calc"
    "l-aside"
    "r-aside"
    "footer";
  height: 100vh; /* Set the height to 100% of the viewport height */
}

.home {
  grid-area: home;
  text-align: center;
}

.pic {
  border: solid;
  border-color: black;
  border-width: 3px;
  width: 100%; /* Ensure images fill their container */
  height: auto; /* Maintain aspect ratio */
}

/* Media query for mobile devices */
@media (max-width: 767px) {
  .pic {
    width: 27%; /* Shrink images to 25% of their original size */
    margin: 0 auto; /* Center images */
    margin-left: 3vw;
  }
}

#calc {
  grid-area: calc;
  padding: 20px;
}

#l-aside,
#r-aside {
  grid-area: l-aside;
}

#r-aside {
  grid-area: r-aside;
  margin-bottom: 3vh;
}

/* Media query for tablets and larger devices */
@media (min-width: 768px) {
  #container {
    grid-template-columns: 1fr 2fr 1fr; /* 3-column layout */
    grid-template-areas:
      "home home home"
      "l-aside calc r-aside"
      "l-aside calc r-aside"
      "footer footer footer";
  }

  #l-aside,
  #r-aside {
    grid-row: span 2; /* Ensure sidebars span two rows */
  }
}

/* Media query for large screens */
@media (min-width: 1200px) {
  #container {
    grid-template-columns: 1fr 2fr 1fr; /* Adjust layout for large screens if necessary */
    grid-template-areas:
      "home home home"
      "l-aside calc r-aside"
      "l-aside calc r-aside"
      "footer footer footer";
  }
}

footer {
  grid-area: footer;
  text-align: center;
  padding: 10px;
  background-color: #ccc;
}
</style>
