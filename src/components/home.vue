<template>
    <div id="container">
        <h1 id="title">Damage Calculator</h1>
    
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
                <h3 id="total-hits">Total Hits: {{ results.totalHits }}</h3>
                <h3 id="criticals">Critical Hits: {{ results.criticals }}</h3>
                <h3 id="final-hits">Final Hits: {{ results.finalHits }}</h3>
            </div>
    
            <div id="results-wounds">
                <h3 id="wounds">Total Wounds: {{ results.wounds }}</h3>
                <h3 id="total-wounds">Final Wounds: {{ results.totalWounds }}</h3>
            </div>
    
            <div id="save-ward">
                <h3 id="saves">Saves: {{ results.saves }}</h3>   
                <h3 id="warded">Warded: {{ results.warded }}</h3>
            </div>
            <div id="damage-done">
                <h3 id="damage-inflicted">Damage: {{ results.damage }}</h3>
            </div>
        </div>
    </div>
    </template>


<script>
export default {
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
            results: null,  // To store the calculation results
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
        calculateDamage() {
    if (!this.validateInputs()){
        return;
    }
    if (this.hitrate > this.critrate){
        this.critrate = this.hitrate;
    }

    let totalHits = this.attacks * ((7 - this.hitrate) / 6);
    let criticals = this.attacks * ((7 - this.critrate) / 6);
    let totalWounds = 0;
    let wounds = 0;
    let mortalDamage = 0;
    let saves = 0;
    let warded = 0;
    let finalHits = totalHits;
    let dmg = 0;

    
    
    if (this.hasRerolls) {
        let rerolledOnes = this.attacks * (1 / 6); // 1/6th of attacks are 1's
        let rerolledHits = rerolledOnes * ((7 - this.hitrate) / 6); // Rerolled hits
        let rerolledCrits = rerolledOnes * ((7 - this.critrate) / 6); // Rerolled crits

        // Remove rerolled crits from rerolled hits so we don't double-count them
        rerolledHits -= rerolledCrits;

        // Add rerolled hits and crits to totals
        criticals += rerolledCrits;
        finalHits += rerolledHits; // Add the rerolled hits to the final hits
    }

    // Apply crit effects
    if (this.critEffects === "Auto Wound") {
        finalHits -= criticals; // Remove criticals from regular hits
        totalWounds += criticals; // Criticals auto wound
    } else if (this.critEffects === "Mortals") {
        finalHits -= criticals; // Remove criticals from regular hits
        mortalDamage += criticals; // Criticals deal mortal damage
    } else if (this.critEffects === "Extra Hits") {
        finalHits += criticals; // Criticals give extra hits
    }
           
            
            wounds = finalHits * ((7 - this.woundRate) / 6 );

            totalWounds += wounds;

            saves = Math.max(0, totalWounds * ((7 - (this.saveRate + this.rend)) / 6 ));

            dmg = this.damage * (totalWounds - saves);

            // warded = dmg * ((7 - this.wardRate) / 6 );
            if (this.wardRate < 7) {
            warded = Math.min(dmg, dmg * ((7 - this.wardRate) / 6));
            dmg = Math.max(0, dmg - warded);
            }

            if (mortalDamage > 0) {
            mortalDamage*= this.damage;
            warded = Math.min(mortalDamage, mortalDamage * ((7 - this.wardRate) / 6));
            dmg += mortalDamage - warded;
            }
           
            
            this.results = {
                totalHits:(totalHits),
                criticals: (criticals),
                finalHits: (finalHits),
                wounds: (wounds),
                totalWounds: (totalWounds),
                saves: (saves),
                damage: (dmg),
                warded:(warded)
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