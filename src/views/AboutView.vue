<template>
  <div id="container">
    <div class="home">
      <img alt="AoS Logo" src="../assets/AoSlogo.jpg">
    </div>
    <nav-bar id="nav"/>
    <div id="about">
    <h1 id="title">Age of Sigmar Damage Calculator & Dice Roller</h1>
    <p class="descirption">This tool helps you calculate the probability of damage based on the offensive stats of one unit attacking another. 
      It considers various factors like hit rate, wound rate, rend, and save, and presents the outcome as a percentage. For example, if your unit hits on 5's, the calculator will 
      show that 33% of the attacks hit. If you make 20 attacks, you’ll see a result of approximately 13.33 hits. This allows for both exact and probabilistic outcomes, making it a 
      helpful resource for planning your strategy. Simply input the offensive stats of your unit attacks, hit rate, wound rate, rend, and any critical efects, and the defensive stats 
      of your target: save, and ward (if a unit does not have either of these input 7).
      </p>
      <p class="description">
        The Dice Roller simulates dice rolls using a random number generator, allowing you to replicate game results. It provides two types of output:
         first, a summary showing the total number of hits, wounds, and saves; and second, a detailed breakdown of each individual roll in the order they were made. 
         Any rerolls or additional hits (displayed as the die rolling a 0) will be displayed at the end, making it easy to track the full sequence of results.
    </p>
  </div>
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
import NavBar from '@/components/NavBar.vue';
export default{
  name: 'AboutView',
  components: {
    NavBar
  }
  
}

</script>

<style scoped>
#container {
  display: grid;
  grid-template-columns: 1fr; 
  grid-template-areas:
    "home"
    "nav"
    "l-aside"
    "about"
    "r-aside"
    "footer";
  height: auto; 
}
#nav{
  grid-area: nav;
}

.home {
  grid-area: home;
  text-align: center;
}

.pic {
  border: solid;
  border-color: black;
  border-width: 3px;
  width: 100%; 
  height: auto; 
}
footer {
    position: relative; 
    grid-area: footer;
  }
  

/* Media query for mobile devices */
@media (max-width: 767px) {
  .pic {
    width: 27%; 
    margin: 0 auto; 
    margin-left: 3vw;
  }
}

#about {
  grid-area: about;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
#title{
  justify-content: flex-start;
  align-items: flex-start;
}

#l-aside {
  grid-area: l-aside;
}

#r-aside {
  grid-area: r-aside;
  margin-bottom: 3vh;
}

/* Media query for tablets and larger devices */
@media (min-width: 768px) {
  #container {
    grid-template-columns: 1fr 2fr 1fr; 
    grid-template-areas:
      "home home home"
      "nav nav nav"
      "l-aside about r-aside"
      "l-aside about r-aside"
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
    grid-template-columns: 1fr 2fr 1fr; 
    grid-template-areas:
      "home home home"
      "l-aside nav r-aside"
      "l-aside about r-aside"
      "l-aside about r-aside"
      "footer footer footer";
  }
  footer {
    position: absolute; 
    bottom: 0;
    left: 0;
    right: 0;
  }
  


}

footer {
  grid-area: footer;
  text-align: center;
  padding: 10px;
  border-top: solid;
  border-color: black;
  width: 100%; 
  height: 50px;
  box-sizing: border-box; 
}

</style>