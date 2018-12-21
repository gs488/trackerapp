<template>
<div id="app">

  <v-app>
    <v-content>
      <v-container >  
        <v-layout row class="mt-3" >
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

                   <!-- <div v-for="(data,key) in monthly" :key="key.id"> -->
                <!-- <v-list-tile-title class="title">   {{data}}</v-list-tile-title> -->
                        <v-subheader id="header">Monthly Spending Goals (Default:1000) 
                           </v-subheader>
                   <v-list two-line subheader>

                <div  v-for="(value,index) in monthly"  v-bind:key="value.id"
      v-bind:title="value.title"
      v-on:remove="value.splice(index, 1)">
                <!-- <v-list-tile-title class="title">   {{value}}</v-list-tile-title> -->
                
                  <v-list-tile avatar>
                    <!-- <v-list-tile-action>
                      <v-checkbox   v-model="value.done" @change="update(value,index)" ></v-checkbox>
                    </v-list-tile-action> -->
            
                    <v-list-tile-content id="padding">
                       <v-list-tile-title :class="{done: value.done}" class="title">{{"$ "+value.spend_goal}}
                      </v-list-tile-title>
                      <v-list-tile-sub-title>Month Spending Goal: {{value.month}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title v-if="value.category!= 'Spending'">Added on: {{day}}, {{month}} {{date}}{{ord}}</v-list-tile-sub-title>
                      <!-- <v-list-tile-sub-title>{{value.date}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title v-if="value.category== 'Spending'"> Monthly Spending Goal</v-list-tile-sub-title> -->
                    </v-list-tile-content>
            
                    <!-- <v-dialog v-model="dialog" max-width="290">
                      <v-btn icon ripple color="red" slot="activator"> <v-icon> close </v-icon> </v-btn>
                      <v-card>
                        <v-card-title class="headline">Remove Your Task</v-card-title>
                        <v-card-text>Are you sure you want to remove this task? This action is irreversible and this task will no longer be visible in your analytics. </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer> -->
                            <!-- <v-btn color="red" dialog = false><v-icon>CANCEL</v-icon></v-btn> -->
                            <!-- <v-btn icon ripple color="red" @click="removeTodo(value,index); dialog = false"><v-icon>DELETE</v-icon></v-btn> -->
                            <!-- <router-link to="/"> <v-btn color="green darken-1" flat @click ="dialog = false">Cancel</v-btn></router-link> -->
                            <!-- <router-link to="/"> <v-btn color="red darken-1" flat @click.native="dialog = true">Cancel</v-btn></router-link> -->
                            <!-- <v-btn color="red" @click="removeTodo(value,index); dialog=false">Delete</v-btn> -->
                        <!-- </v-card-actions> -->
                      <!-- </v-card> -->
                    <!-- </v-dialog> -->
                    
                    <!-- <v-btn icon ripple color="red" @click="removeTodo(value,index)">
                      <v-icon>close</v-icon>
                    </v-btn> -->
                  </v-list-tile>
                  
                </div>
                            </v-list>
                <!-- </div> -->



              <v-list two-line subheader>
                <v-container>
                  <p class="text-xs-right">Expenses: <b>{{number}}</b></p>
             
                </v-container>
                <div v-for="(key,data) in spendlist" :key="data.id">
                <v-list-tile-title id= "moveover" class="title">   {{data}}</v-list-tile-title>
                <div  v-for="(value,index) in key"  v-bind:key="value.id"
      v-bind:title="value.title"
      v-on:remove="value.splice(index, 1)">
               
                  <v-list-tile avatar>
                    <!-- <v-list-tile-action>
                      <v-checkbox   v-model="value.done" @change="update(value,index)" ></v-checkbox>
                    </v-list-tile-action> -->
                    <v-list-tile-content>
                       <v-list-tile-title :class="{done: value.done}" class="title">{{"$ "+value.spent}}
                      </v-list-tile-title>
                      <v-list-tile-sub-title>Category: {{value.category}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title v-if="value.category!= 'Spending'">Added on: {{day}}, {{month}} {{date}}{{ord}}</v-list-tile-sub-title>
                      <!-- <v-list-tile-sub-title>{{value.date}}</v-list-tile-sub-title> -->
                       <v-list-tile-sub-title>{{value.details}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title v-if="value.category== 'Spending'"> Monthly Spending Goal</v-list-tile-sub-title>
                    </v-list-tile-content>
            
                    <!-- <v-dialog v-model="dialog" max-width="290">
                      <v-btn icon ripple color="red" slot="activator"> <v-icon> close </v-icon> </v-btn>
                      <v-card>
                        <v-card-title class="headline">Remove Your Task</v-card-title>
                        <v-card-text>Are you sure you want to remove this task? This action is irreversible and this task will no longer be visible in your analytics. </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer> -->
                            <!-- <v-btn color="red" dialog = false><v-icon>CANCEL</v-icon></v-btn> -->
                            <!-- <v-btn icon ripple color="red" @click="removeTodo(value,index); dialog = false"><v-icon>DELETE</v-icon></v-btn> -->
                            <!-- <router-link to="/"> <v-btn color="green darken-1" flat @click ="dialog = false">Cancel</v-btn></router-link> -->
                            <!-- <router-link to="/"> <v-btn color="red darken-1" flat @click.native="dialog = true">Cancel</v-btn></router-link> -->
                            <!-- <v-btn color="red" @click="removeTodo(value,index); dialog=false">Delete</v-btn> -->
                        <!-- </v-card-actions> -->
                      <!-- </v-card> -->
                    <!-- </v-dialog> -->
                    
                    <v-btn icon ripple color="red" @click="removeTodo(value,index)">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-list-tile>
                  
                </div>
              
                </div>
              </v-list>

        <v-flex id="movebutton">
          <router-link to="/input_spending"> <v-btn id="spendingbutton" class="blue darken-4">Add Spending</v-btn></router-link>
        </v-flex>

    <v-bottom-nav
      
     
      absolute
      color="transparent"
    >
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
import _ from 'lodash'

export default {

 data () {
    return {
 
      id: 0,
      todolist: [],
      spendlist: [],
      monthly:{},
      newTodo: '',
      todo: [],
      todos: [],
      day: this.todoDay(),
      month:this.todomonth(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear(),
      offsetTop: 0,
      dialog: false,
      // duedate:
    }
  },
   computed: {
    // a computed getter
    number: function () {
      var l=0;
      for (var data in this.spendlist){
        l+=this.spendlist[data].length
      }

      return l
    }
  },
  methods: {
    // addTodo() {
    //   var value = this.newTodo && this.newTodo.trim();
    //   if (!value) {
    //     return;
    //   }
    //   this.todos.push({
    //     title: this.newTodo,
    //     done: false
    //   });
    //   this.newTodo = '';
    // },

    update(value,index){
       var data=JSON.parse(localStorage.getItem('moneyspent'));
       console.log(data);
       console.log(value);

       data[value.date][index]=value
    //   console.log(value);
    // var update=Object.values(this.todolist);
    // console.log(update);
    // var combined=[].concat.apply([], update);
    // console.log(combined)

   


    //  var task=update[value.date][index];
     
    //  console.log(task);
    //  task
    //  console.log(index);
    //  update[index]=value;
    // //  console.log(task[index]);
    //  console.log(  update[index]);
    //  console.log(update);
     localStorage.setItem('moneyspent',JSON.stringify(data));

    //  =task[index]
    },
    removeTodo(value,index) {
      // console.log("working")
      console.log(this.spendlist)
      var correct=this.spendlist[value.date]
      console.log(correct);
      if (Object.keys(this.spendlist).length==1 && correct.length>1){
        correct.splice(index,1);
        
      localStorage.setItem('moneyspent',JSON.stringify(this.spendlist));
    }
      // console.log(Object.keys(this.todolist).length);
      // console.log(correct.length);
      else if (correct.length==1 && Object.keys(this.spendlist).length==1){
        console.log('yes');
        this.spendlist=[];
        localStorage.removeItem('moneyspent');
      }

      else if ((Object.keys(this.spendlist).length>1 && correct.length>1)){
 correct.splice(index,1);
        
      localStorage.setItem('moneyspent',JSON.stringify(this.spendlist));
      }

      else if ((Object.keys(this.spendlist).length>1 && correct.length==1)){
           correct.splice(index,1);
           delete this.spendlist[value.date];
      localStorage.setItem('moneyspent',JSON.stringify(this.spendlist));
      }
      // var values = Object.keys(this.todolist).map(function (key) { return this.todolist[key]; });
      // console.log(values);
      // // console.log(index);
      // this.todolist.values.splice(index, 1);
      // console.log(this.todolist);
     
     
    },

    todoDay() {
      var d = new Date();
      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      return days[d.getDay()];
    },
    todomonth() {
      var d = new Date();
     var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return months[d.getMonth()];
    }
    ,
    nth(d) {
      if(d>3 && d<21) return 'th';
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    },
     custom_sort(a, b) {
    return (a.datesort).getTime() - (b.datesort).getTime();
},
 checkDuplicateInObject(propertyName, inputArray) { var seenDuplicate = false, testObject = {}; inputArray.map(function(item) { var itemPropertyName = item[propertyName]; if (itemPropertyName in testObject) { testObject[itemPropertyName].duplicate = true; item.duplicate = true; seenDuplicate = true; } else { testObject[itemPropertyName] = item; delete item.duplicate; } }); return seenDuplicate; },
 check(date){
    var counter=0
    for(var i = 0; i < this.spendlist.length; i++) {
    if (this.spendlist[i].date == date) {
      counter=counter+1;
    }
    } 
    if (counter==1){
      return true
    }
    return false

 },
  // onScroll (e) {
  //     this.offsetTop = e.target.scrollTop
  //   }
  },
    mounted() {
      var get=JSON.parse(localStorage.getItem('moneyspent'));
      var monthly=JSON.parse(localStorage.getItem('monthlyspending'));
      console.log(monthly);
       this.$set(this.$data,"monthly",monthly);
      console.log(get);
      
      if (get) {

    var update=Object.values(get);
    console.log(update);
    var combined=[].concat.apply([], update);
        for (var i=0;i<combined.length;i++){
          var date=combined[i].date.split('-');
          var d = new Date(date[0],date[1]-1,date[2]);
          // console.log(d);
          combined[i].datesort=d;
        }
      console.log(Object.keys(combined).length);  
      if (Object.keys(combined).length>1){
      combined.sort(this.custom_sort);
      }
      console.log(combined)
      var taskbydate=_.groupBy(combined,"date");
      console.log(taskbydate);
      this.$set(this.$data,"spendlist",taskbydate);
      // console.log(this.todolist)
      // this.$set(this.$data,"output",localStorage.getItem('event'));
    // timeinterval = setInterval(() => {
    //         this.current = Math.trunc((new Date()).getTime() / 1000);
    //     }, 1000);
    }
  //  created() {
  //           this.id = this.$route.params.id;
  //           if(this.$route.query.debug) {
  //               this.debug = this.$route.query.debug;
  //           }
  //  }
}
}
</script>
<style scoped>
.done {
  text-decoration: line-through;
}
#movebutton {
  text-align: center;
}
form {
  height: 200px;
}
.centername {
  text-align: center;
}
#spendingbutton {
  color: white;
}

#header {
  font-size: 17px;
}

#moveover {
  margin-left: 2.5%;
}

.moveman {
  margin-left: 5%;
}

/* #padding {
  padding: 5px;
} */
</style>