<template>
    <div id="container">
        <h1 id="title">Dice Roller</h1>
    
        <form id="unitStats" v-on:submit.prevent="calculateDamage">
            <label for="attacks" class="attacks">Number of Attacks</label>
            <input v-model="attacks" type="number" class="attacks">
    
            <label for="hitRate" class="hit">Weapon Skill/Ballistic Skill</label>
            <select type="number" class="hit" id="hitRate" v-model="hitrate">
                <option v-for="value in hitOptions" :key="value" :value="value">
                    {{ value }}
                </option>
            </select>
    
            <label for="critChance">Crit Chance</label>
            <select id="critChance" class="crit" v-model="critrate">
                <option v-for="value in critChanceOptions" :key="value" :value="value">
                    {{ value }}
                </option>
            </select>
    
            <label for="critEffect">Crit Effect</label>
            <select id="critEffect" class="crit" v-model="critEffects">
                <option v-for="crit in critOptions" :key="crit.name">
                    {{ crit.name }}
                </option>
            </select>
    
            <label for="woundRate">Wound Rate</label>
            <select type="number" class="wound" id="woundRate" v-model="woundRate">
                <option v-for="value in woundOptions" :key="value" :value="value">
                    {{ value }}
                </option>
            </select>

            <label for="rend">Rend</label>
            <input v-model="rend" type="number">

            <label for="damage">Damage</label>
            <input v-model="damage" type="number">
    
            <label for="saveRate">Save</label>
            <select type="number" class="save" id="saveRate" v-model="saveRate">
                <option v-for="value in saveOptions" :key="value" :value="value">
                    {{ value }}
                </option>
            </select>
    
            <div id="wards">
                <label for="hasWard">Ward Save (use 7 if no save)</label>
                <select type="number" id="ward" v-model="wardRate" v-if="hasWard = true">
                    <option v-for="value in wardOptions" :key="value" :value="value">
                        {{ value }}
                    </option>
                </select>
            </div>
            <div id="rerolls">
                <label for="hasRerollhits">Reroll Hits of 1</label>
                <input type="checkbox" v-model="hasRerolls">
            </div>
    
            <input type="submit" value="Submit">
        </form>
    
        <!-- Results Container -->
        <div id="results-container" v-if="results">
            <div id="results-hits">
                <h3 id="total-hits">Total Hits: {{results.totalHits.length}} {{ results.totalHits }}</h3>
                <h3 id="criticals">Critical Hits:{{ results.criticals.length }} {{ results.criticals }}</h3>
                <!-- <h3 id="final-hits">Final Hits: {{ results.finalHits }}</h3> -->
            </div>
    
            <div id="results-wounds">
                <h3 id="wounds">Total Wounds:{{ results.wounds.length }} {{ results.wounds }}</h3>
                <!-- <h3 id="total-wounds">Final Wounds: {{ results.totalWounds }}</h3> -->
            </div>
    
            <div id="save-ward">
                <h3 id="saves">Saves:{{ results.saves.length }} {{ results.saves }}</h3>   
                <h3 id="warded">Warded:{{ results.warded.length }} {{ results.warded }}</h3>
            </div>
            <div id="damage-done">
                <h3 id="damage-inflicted">Damage: {{ results.damage }}</h3>
            </div>
        </div>
    </div>
    </template>


<script>
export default {
    name: 'DiceRoller',
    data () {
        return {
            attacks: 0,
            hitrate: 0,
            critrate: 0,
            woundRate: 0,
            rend: 0,
            damage: 0,
            saveRate: 0,
            wardRate: 0,
            number: null,
            minValue: 2,
            maxValue: 6,
            hasWard: false,
            hasRerolls: false,
            results: {
                totalHits: [],
                 criticals: [],
                wounds: [],
                saves: [],
                 damage: 0,
                warded: []
            },  // To store the calculation results
            crits: [
                { name: "None", id: false },
                { name: "Auto Wound", id: false },
                { name: "Mortals", id: false },
                { name: "Extra Hits", id: false }
            ]
        }
    },
    computed: {
        hitOptions() {
            let hitRate = [];
            for (let i = this.minValue; i <= this.maxValue; i++) {
                hitRate.push(i);
            }
            return hitRate;
        },
        woundOptions() {
            let woundRate = [];
            for (let i = this.minValue; i <= this.maxValue; i++) {
                woundRate.push(i);
            }
            return woundRate;
        },
        saveOptions() {
            let saveRate = [];
            for (let i = this.minValue; i <= this.maxValue; i++) {
                saveRate.push(i);
            }
            saveRate.unshift(1);
            saveRate.push(7);
            return saveRate;
        },
        wardOptions() {
            let wardRate = [];
            for (let i = this.minValue + 2; i <= this.maxValue; i++) {
                wardRate.push(i);
            }
            wardRate.push(7);
            return wardRate;
        },
        critOptions() {
            return this.crits;
        },
        critChanceOptions() {
            let critRate = [];
            for (let i = this.minValue; i <= this.maxValue; i++) {
                critRate.push(i);
            }
            return critRate;
        }
    },
    methods: {
        rollDice(min = 1, max = 6) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    },
        calculateDamage() {
    if (!this.validateInputs()){
        return;
    }
    if (this.hitrate > this.critrate && this.critEffects !== "Mortals"){
        this.critrate = this.hitrate;
    }

    
    
    
    let wounds = [];
    let mortalDamage = 0;
    let saves = [];
    let warded = [];
    let dmg = 0;
    let failedSaves = [];
    let hits = [];
    let crits = [];
    let totalAttacks = Array.from( {length : this.attacks}, ()=> this.rollDice());
    
    totalAttacks.forEach((attack)=>{
        if (attack === 1 && this.hasRerolls){
            attack = this.rollDice();
        }
       if (attack >= this.hitrate && attack < this.critrate){
        hits.push(attack);
       }
       if (attack >= this.critrate){
        crits.push(attack);
       }
    });

    if (this.critEffects === "Extra Hits"){
        for (let i = 0; i < crits.length; i++){
            hits.push(crits[i]);
            hits.push(0);
        }
    }
    if (this.critEffects === "None"){
        for (let i = 0 ; i< crits.length; i++){
            hits.push(crits[i]);
        }
    }
    wounds = Array.from({length : hits.length}, ()=> this.rollDice());
    
    for (let i = wounds.length -1; i >= 0; i--){
        // const roll = this.rollDice();
            if (wounds[i] < this.woundRate){
                wounds.splice(i, 1);
            }
    }

    if (this.critEffects === "Auto Wound"){
        for(let i = 0; i < crits.length; i++){
            wounds.push(crits[i]);
        }
    }

    saves = Array.from({length : wounds.length}, ()=>this.rollDice());

    for (let i = saves.length -1; i >= 0; i--){
        // const roll = this.rollDice();
        if (saves[i] < (this.saveRate + this.rend)){
            failedSaves.push(saves[i])
            saves.splice(i,1);
        }
    }
    if (this.critEffects === "Mortals"){
        mortalDamage = crits.length * this.damage;
    }
    const totalDamage = (failedSaves.length * this.damage) + mortalDamage;
    while (failedSaves.length < totalDamage){
        failedSaves.push(0);
    }

    for(let i = failedSaves.length -1 ; i >= 0; i--){
        const roll = this.rollDice();
        if (roll >= this.wardRate){
           warded.push(roll);
        }else{
            dmg++;
        }
    }

    
      
            
            this.results = {
                totalHits:([...hits]),
                criticals: ([...crits]),
                wounds: ([...wounds]),
                saves: [...saves],
                damage: (dmg),
                warded:[...warded]
            };
        },
        validateInputs() {
    if (this.attacks < 1) {
        alert('Attacks must be at least 1');
        return false;
    }
    if (this.hitrate < 2 || this.hitrate > 6) {
        alert('Hit rate must be between 2 and 6');
        return false;
    }
    if (this.woundRate < 2 || this.woundRate > 6) {
        alert('Wound rate must be between 2 and 6');
        return false;
    }
    if (this.rend < 0) {
        alert('Rend cannot be negative');
        return false;
    }
    if (this.damage < 1) {
        alert('Damage must be at least 1');
        return false;
    }
    return true;
}
    }
}

</script>

<style scoped>

.hit,
.hit#hitRate{
    display: flex;
    flex-flow: row;
    justify-content: center;
}

#results-container {
    display: flex;
    flex-flow: column;
    border: 3px solid black;
    padding: 5px;
    margin: 5px;
    background-color: goldenrod;
    text-align: center;
}

#results-hits, #results-wounds, #save-ward, #damage-done {
    margin-bottom: 10px;
}

#results-hits h3, #results-wounds h3, #save-ward h3, #damage-done h3 {
    margin: 5px 0;
}

input[type="number"], 
select, 
input[type="submit"]{
    max-width: 300px;
    width: 100%;
    display: block;
    
}

input[type="submit"] {
    background-color: darkblue;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
#unitStats {
    display: flex;
    flex-direction: column;
    align-items: center; 
    border: 3px solid black;
    padding: 15px; 
    background-color: goldenrod;
    margin: 0 auto;
    max-height: 90vh; 
    font-weight: bold;
}
</style>