<template>
<nav>
    <RouterLink to="/" v-if="this.$route.name !=='about'">Home </RouterLink>
    <p id="bar" v-if="this.$route.name !== 'about'">|</p>
    <RouterLink to ="/DamageCalculator" v-if="this.$route.name !=='Damage Calculator'"> Damage Calculator </RouterLink>
    <p id="bar" v-if="this.$route.name !=='Damage Calculator' && this.$route.name !=='Dice Roller'">|</p>
    <RouterLink to="/DiceRoller" v-if="this.$route.name !=='Dice Roller'"> Dice Roller</RouterLink>
</nav>


</template>



<script>
export default{
    name: 'NavBar',
    data(){
        return{

        }
    }
}
</script>



<style scoped>
nav{
    display: flex;
    align-items: center;
    justify-content: center;
}
#bar{
    margin: 0 10px;
}

</style>