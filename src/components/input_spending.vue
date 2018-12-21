<template>
<div id="app">
  <v-app>
    <v-content>
      <v-container>
        <v-layout row class="mt-3">
          <v-flex xs12 sm6 offset-sm3>
            <v-card white>
              <v-toolbar color="white">
                <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                <v-flex class="centername">
                <v-toolbar-title id="appname" class="headline">Tracker</v-toolbar-title>
                </v-flex>
              </v-toolbar>
              <v-toolbar color="blue darken-4">
                <v-flex class="centername">
                <v-toolbar-title class="headline white--text">{{day}}, {{month}} {{date}}{{ord}}</v-toolbar-title>
                </v-flex>
              </v-toolbar>
              <v-divider></v-divider>
                <v-container>
                  <form>

               <v-flex xs12 >
        <v-select
          :items="spending_cat"
          label="Spending Category"
          v-model="selectedcat"
        ></v-select>
    </v-flex>
      
        <v-flex>
         <v-text-field type="number"
            label="Amount Spent"
            placeholder="$5.00"
            v-model="amountspent"
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
        <v-menu
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date1"
            label="Date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date1" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex>
         <v-text-field  
            label="Details"
            placeholder="Went to the movies!"
            v-model="details"
          ></v-text-field>
        </v-flex>

      <v-card-actions>
        <!-- <v-btn
          flat
          @click="$refs.form.reset()">
        Clear</v-btn> -->


        <v-spacer></v-spacer>
        
  



      <v-dialog v-model="dialog" persistent max-width="290">
        <v-btn id="submit" class="white--text" color="blue darken-4" @click="pushSpending " slot="activator">Submit</v-btn>
        <v-card>
          <v-card-title class="headline">Success</v-card-title>
          <v-card-text>You've inputted spending! To see it, check out the spending screen. </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/input_spending"> <v-btn color="green darken-1" flat @click.native="dialog = false">Input Again</v-btn></router-link>
            <router-link to="/spending"> <v-btn color="green darken-1" flat @click.native="dialog = false">Spending</v-btn></router-link>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      </v-card-actions>


    </form>
                </v-container>
                         <v-bottom-nav xs12 sm6 offset-sm3>
      <v-btn :to="{name: 'main'}">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      
      <v-btn :to="{name: 'page1'}">
        <span>Tasks</span>
        <v-icon>add</v-icon>
      </v-btn>
 
      <v-btn :to="{name: 'spending'}">
        <span>Spending</span>
        <v-icon>attach_money</v-icon>
      </v-btn>

      <v-btn :to="{name: 'analytics'}">
        <span>Analytics</span>
        <v-icon>bar_chart</v-icon>
      </v-btn>
    </v-bottom-nav>

            </v-card>
          </v-flex>
        </v-layout>

      </v-container>

    </v-content>
  </v-app>
</div>
</template>


<script>
export default {
  name: 'spending',
  data () {
    return{
    spending_cat: ['Food', 'Entertainment', 'Bills', 'Miscellaneous'],
    day: this.todoDay(),
    month:this.todomonth(),
    date: new Date().getDate(),
    ord: this.nth(new Date().getDate()),
    year: new Date().getFullYear(),
    selectedcat:'',
    amountspent:0,
    amount: {},
    details: '',
    
    menu2: false,
    date1: new Date().toISOString().substr(0, 10),
    dialog:false,
    }
  },
  
    methods: {
    pushSpending() {
      // localStorage.removeItem('moneyspent');
      if (JSON.parse(localStorage.getItem('moneyspent'))){
      this.amount=JSON.parse(localStorage.getItem('moneyspent'));
     
      if (this.amount.hasOwnProperty(this.date1)){
     
     this.amount[this.date1].push({
        category:this.selectedcat,
        spent:this.amountspent,
        date: this.date1,
        done:false,
        details:this.details,

      });
      }
      else if (!this.amount.hasOwnProperty(this.date1)){
         this.amount[this.date1]=[];
          this.amount[this.date1].push({
        category:this.selectedcat,
        spent:this.amountspent,
        date: this.date1,
        done:false,
        details:this.details,
      });
      }
      }

      else{
        this.amount[this.date1]=[];
          this.amount[this.date1].push({
        category:this.selectedcat,
        spent:this.amountspent,
        date: this.date1,
        done:false,
        details:this.details,
      })}
      this.selectedcat='';
      this.amountspent='';
      this.details='';
      
     console.log(this.amount);
     this.amount=JSON.stringify(this.amount);  
     localStorage.setItem('moneyspent',this.amount);    
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    todoDay() {
      var d = new Date();
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      return days[d.getDay()]
    },
    todomonth() {
      var d = new Date();
     var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return months[d.getMonth()]
    },
    nth (d) {
      if (d > 3 && d < 21) return 'th'
      switch (d % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#donebutton {
    color: white;
}
form {
  height: 250px;
}
.centername {
  text-align: center;
}
</style>
