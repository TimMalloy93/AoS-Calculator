<template>
    <div id="container">
    <div class="home">
      <img alt="AoS Logo" src="../assets/AoSlogo.jpg">
    </div>
    <nav-bar id="nav"/>
      <DiceRoller id="roller"/>
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
  import DiceRoller from '../components/DiceRoller.vue';
  import NavBar from '@/components/NavBar.vue';
  
  export default {
    name: 'DiceRollerView',
    components: {
      DiceRoller,
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
      "roller"
      "r-aside"
      "footer";
    min-height: 100vh; 
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
    
  
  
  @media (max-width: 767px) {
    .pic {
      width: 27%; 
      margin: 0 auto; 
      margin-left: 3vw;
    }
  }
  
  #roller {
    grid-area: roller;
    padding: 20px;
  }
  
  #l-aside {
    grid-area: l-aside;
    margin-bottom: 3vh;
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
        "l-aside roller r-aside"
        "l-aside roller r-aside"
        "footer footer footer";
    }
  
    #l-aside,
    #r-aside {
      grid-row: span 2; 
    }
  }
  
  /* Media query for large screens */
  @media (min-width: 1200px) {
    #container {
      grid-template-columns: 1fr 2fr 1fr; 
      grid-template-areas:
        "home home home"
        "l-aside nav r-aside"
        "l-aside roller r-aside"
        "l-aside roller r-aside"
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
  