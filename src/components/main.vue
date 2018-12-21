<template>


<div id="app">

  <v-app>
    
    <v-content>

      <v-container >  

        <v-layout row class="mt-3" >

          <v-flex xs12 sm6 offset-sm3>

            <v-card>
              <v-toolbar color="white">
                <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                <v-flex>
                <v-toolbar-title id="centername1" class="headline">Tracker</v-toolbar-title>
                </v-flex>
              </v-toolbar>
              <v-toolbar color="blue darken-4">
                <v-flex class="centername">
                <v-toolbar-title class="headline white--text">{{day}}, {{month}} {{date}}{{ord}}</v-toolbar-title>
                </v-flex>
              </v-toolbar>
              <v-divider></v-divider>
              <v-list two-line subheader>
                <v-container>
              
                </v-container>
                <v-subheader class="subheading" v-if="num==0">You have {{number}} Tasks, add some</v-subheader>
                <v-subheader class="subheading" v-if="num>0">{{number}}  Tasks</v-subheader>
                <div v-for="(key,data) in todolist" :key="data.id">
                <v-list-tile-title class="title"> Due Date: {{data}}</v-list-tile-title>
                <div  id="padding" v-for="(value,index) in key"  v-bind:key="value.id"
      v-bind:title="value.title"
      v-on:remove="value.splice(index, 1)">
               
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox class = "moveman"  v-model="value.done" @change="update(value,index)" ></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title v-if="value.category!= 'Spending'" :class="{
                  done: value.done
                  }" class="title"> {{value.title}}
                      </v-list-tile-title>

                       <v-list-tile-title v-else-if="value.category== 'Spending'" :class="{
                  done: value.done
                  }" class="title">{{"$ "+value.spend_goal}}
                      </v-list-tile-title>
                      <v-list-tile-sub-title  class = "moveover">Category: {{value.category}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title class = "moveover" v-if="value.category!= 'Spending'">Added on: {{day}}, {{month}} {{date}}{{ord}}</v-list-tile-sub-title>
                      <!-- <v-list-tile-sub-title class = "moveover" v-if="value.category!= 'Spending'">Due on: {{value.date}}</v-list-tile-sub-title> -->
                      <!-- <v-list-tile-sub-title v-if="value.category== 'Spending'">{{value.repeated}} Monthly Spending Goal</v-list-tile-sub-title> -->
                      <v-list-tile-sub-title class = "moveover">Time:{{value.time}} </v-list-tile-sub-title>
                      <v-list-tile-sub-title class = "moveover">Details:{{value.details}} </v-list-tile-sub-title>
                      
                      
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
                           <!-- <v-btn color="red" @click="removeTodo(value,index); dialog = false">Delete</v-btn>
                       </v-card-actions>
                     </v-card>
                   </v-dialog> -->


                    <v-btn icon ripple color="red" @click="removeTodo(value,index)">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-list-tile>
                </div>
                </div>
              </v-list>
          
    <v-bottom-nav>
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

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import _ from 'lodash'

export default {
  // name: 'tracker',
  //  props: ['todos'],
 data () {
    return {
      // console.log(todolist);
      id: 0,
      todolist: [],
      newTodo: '',
      todo: [],
      todos: [],
      day: this.todoDay(),
      month:this.todomonth(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear(),
        offsetTop: 0,
        dialog:false,
        num:0
      // duedate:
    }
  },
   computed: {
    // a computed getter
    number: function () {
      var l=0;
      for (var data in this.todolist){
        l+=this.todolist[data].length
      }
      this.$set(this.$data,"num",l);
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
       var data=JSON.parse(localStorage.getItem('todojson'));
       console.log(data);
       console.log(value);

       data[value.date][index]=value
    //   console.log(value);
    // var update=Object.values(this.todolist);
    // console.log(update);
    // var combined=[].concat.apply([], update);
    // console.log(combined)

    
    // var correctindex=combined.length-1+index;
    // var data=JSON.parse(localStorage.getItem('todojson'));
    // console.log(data[correctindex]);
    // data[correctindex]=value;

    //  var task=update[value.date][index];
     
    //  console.log(task);
    //  task
    //  console.log(index);
    //  update[index]=value;
    // //  console.log(task[index]);
    //  console.log(  update[index]);
    //  console.log(update);
     localStorage.setItem('todojson',JSON.stringify(data));

    //  =task[index]
    },
    removeTodo(value,index) {
      // console.log("working")
      console.log(value);
      console.log(index);
      console.log(this.todolist)
      var correct=this.todolist[value.date]
      console.log(correct);
      if (Object.keys(this.todolist).length==1 && correct.length>1){
        console.log('first')
        correct.splice(index,1);
        
      localStorage.setItem('todojson',JSON.stringify(this.todolist));
    }
      // console.log(Object.keys(this.todolist).length);
      // console.log(correct.length);
      else if (correct.length==1 && Object.keys(this.todolist).length==1){
        console.log('second');
        this.todolist=[];
        localStorage.removeItem('todojson');
      }

      else if ((Object.keys(this.todolist).length>1 && correct.length>1)){

        console.log('third')
 correct.splice(index,1);
        
      localStorage.setItem('todojson',JSON.stringify(this.todolist));
      }

      else if ((Object.keys(this.todolist).length>1 && correct.length==1)){
        console.log('fifth')
           correct.splice(index,1);
           delete this.todolist[value.date];
      localStorage.setItem('todojson',JSON.stringify(this.todolist));
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
    for(var i = 0; i < this.todolist.length; i++) {
    if (this.todolist[i].date == date) {
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
      var get=JSON.parse(localStorage.getItem('todojson'));
     
      console.log(get);
      
      if (get) {

    var update=Object.values(get);
    console.log(update);
    var combined=[].concat.apply([], update);
    console.log(combined);
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
      this.$set(this.$data,"todolist",taskbydate);
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
#centername1{
  text-align: center;
}
.centername {
  text-align: center;
}
.title {
  margin-left: 5%;
}
.moveover {
  margin-left: 5%;
  margin-top: -5px;
}
.moveman {
  margin-left: 17%;
}
#padding {
  padding: 0px;
}
</style>