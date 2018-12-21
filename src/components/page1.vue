<template>
<div id="app">
  <v-app>
    <v-content>
      <v-container>
          <!-- <router-link :to="{ name: 'main', params: { todolist: this.$data.todos }}">Navigate to Page2</router-link> -->
        <v-layout row class="mt-3">
          <v-flex xs12 sm6 offset-sm3>
            <!-- <v-flex> -->
            <v-card white>
              <v-toolbar color="white">
                <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                <v-flex class="centername">
                <v-toolbar-title id="appname" class="headline">Tracker</v-toolbar-title>
                </v-flex>
              </v-toolbar>
              <v-toolbar color="blue darken-4">
                <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                <v-flex class="centername">
                <v-toolbar-title class="headline white--text">{{day}}, {{month}} {{date}}{{ord}}</v-toolbar-title>
                </v-flex>
              </v-toolbar>
              <v-divider></v-divider>
              <!-- <v-list two-line subheader> -->
                <v-container>
                  <form>
                      <v-flex>
        <v-select
          :items="cat_items"
          label="Category"
          v-model="selectedcategory"
        ></v-select>
      </v-flex>
 <v-flex  v-if="selectedcategory =='Set Monthly Spending Goal'">
          <v-select
          :items="months"
          label="Month"
          v-model="selectedmonth"
        ></v-select>

        </v-flex>

               <v-flex v-if="selectedcategory =='Add New Category'" xs12>
                <v-text-field
                    v-model="newCategory" label="Enter New Category">
                  </v-text-field>
                  </v-flex>
                   <!-- <v-layout  row class="mt-3">  -->
                  <!-- <v-subheader class="headline">{{day}}, {{month}} {{date}}{{ord}}</v-subheader> -->
                  <!-- <p class="text-xs-right"><b>{{todos.length}}</b> Tasks</p> -->
                  <v-flex v-if="selectedcategory !='Set Monthly Spending Goal'">
                    <v-text-field clearable color="blue darken-2" v-model="newTodo" id="newTodo" name="newTodo" label="Type your task">
                    </v-text-field>
                  </v-flex>
                <v-flex v-if="selectedcategory =='Set Monthly Spending Goal'">
                  <v-text-field
                    type="number"
                    class="inputPrice"
                    value="5"
                  label="Monthly Spending Goal"
                  v-model="newSpend"
                    >
      </v-text-field>
      </v-flex>

       <!-- <v-flex v-if="selectedcategory =='Add New Category'">
                <v-text-field
                    solo >
                  </v-text-field>
                  </v-flex> -->
                  
                  <!-- <v-flex v-if="selectedcategory !='Spending'" xs12>
                    <v-text-field clearable color="white" v-model="newTodo" id="newTodo" name="newTodo" label="Type your task">
                    </v-text-field>
                  </v-flex> -->

                  <!-- <v-flex v-else-if="selectedcategory !='Add New Category'||'Spending'" >
                    <v-text-field clearable color="white" v-model="newTodo" id="newTodo" name="newTodo" label="Type your task">
                    </v-text-field>
                  </v-flex> -->
                   <!-- </v-layout> -->
        <!-- <v-flex> -->
          <!-- <v-text-field
              label="Event Title"
            ></v-text-field>
        </v-flex> -->

      <!-- <v-flex xs12 >
        <v-select
          :items="metric_items"
          label="Metric"
          v-model="selectedmetric"
        ></v-select>
      </v-flex> -->
       <v-flex v-if="selectedcategory != 'Set Monthly Spending Goal' && selectedcategory!='Academics' && selectedcategory!='Add New Category'">
        <v-select
          :items="repeat_items"
          label="Repeat (Required for Medicine)"
          v-model="selectedrepeated"
        ></v-select>
      </v-flex>
   <v-flex v-if="selectedcategory != 'Set Monthly Spending Goal'">
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
 <v-flex v-if="selectedrepeated == 'Daily' && selectedcategory == 'Medicine' " >
        <v-menu
          :close-on-content-click="false"
          v-model="menu4"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="enddate"
            label="End Date of Daily Repeat Range"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="enddate" @input="menu4 = false"></v-date-picker>
        </v-menu>
      </v-flex>

      <!-- <template> -->
<!--         
    <v-flex v-if="selectedcategory == 'Medicine'" xs12>
    <v-daterange v-model="daterange"   :options="dateRangeOptions" @input="onDateRangeChange"></v-daterange>
    </v-flex> -->
<!-- </template> -->


    <v-flex v-if="selectedcategory != 'Set Monthly Spending Goal'">
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu3"
          :nudge-right="40"
          :return-value.sync="time"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="time"
            label="Time"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker
            v-if="menu3"
            v-model="time"
            full-width
            @change="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>
      </v-flex>

 <v-textarea
          v-model="details"
          auto-grow
          box
          color="blue darken-2"
          label="Description"
          rows="1"
           v-if="selectedcategory != 'Set Monthly Spending Goal'"
  ></v-textarea>

      <v-card-actions>
        <v-spacer></v-spacer>        
        <!-- <v-btn 
          flat outline
          @click="this.$refs.form.reset()"
        >
          Clear
        </v-btn> -->
        
    
         <v-dialog v-model="dialog" persistent max-width="290">
        <v-btn  id="submit_button" v-if="selectedcategory == 'Medicine' && selectedrepeated == 'Daily' " color="blue darken-4" @click="medicine" slot="activator" dark>Submit</v-btn>
          <v-btn  class="submit_button" v-if="selectedcategory == 'Medicine' && selectedrepeated == 'None' " color="blue darken-4" @click="addTodo" slot="activator" dark>Submit</v-btn>
          <v-btn  class="submit_button" v-if="selectedcategory != 'Medicine' && selectedcategory != 'Set Monthly Spending Goal' " color="blue darken-4" @click="addTodo" slot="activator" dark>Submit</v-btn>
          <v-btn  v-if="selectedcategory == 'Set Monthly Spending Goal'" color="blue darken-4" @click="changegoal" slot="activator" dark>Submit</v-btn>
        <v-card>
          <v-card-title class="headline">Success</v-card-title>
          <v-card-text>You've added a new task or goal! To see it, check out the home or spending screen. </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/page1"> <v-btn color="green darken-1" flat @click.native="dialog = false">New Task</v-btn></router-link>
            <router-link to="/spending"> <v-btn color="green darken-1" flat @click.native="dialog = false">Spending</v-btn></router-link>
            <router-link to="/"> <v-btn color="green darken-1" flat @click.native="dialog = false">Home</v-btn></router-link>
          </v-card-actions>
        </v-card>
      </v-dialog>
   

    <!-- <v-dialog v-model="dialog" persistent max-width="290">
        <v-btn  class="submit_button" v-if="selectedrepeated == 'None'" color="blue darken-4" @click="addTodo" slot="activator" dark>Submit</v-btn>
        <v-card>
          <v-card-title class="headline">Success</v-card-title>
          <v-card-text>You've added a new task or goal! To see it, check out the home screen. </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/page1"> <v-btn color="green darken-1" flat @click.native="dialog = false">New Task</v-btn></router-link>
            <router-link to="/"> <v-btn color="green darken-1" flat @click.native="dialog = false">Home</v-btn></router-link>
          </v-card-actions>
        </v-card>
      </v-dialog>

    
    <v-dialog v-model="dialog" persistent max-width="290">
        <v-btn  class="submit_button" v-if="selectedrepeated == 'Daily'" color="blue darken-4" @click="medicine" slot="activator" dark>Submit</v-btn>
        <v-card>
          <v-card-title class="headline">Success</v-card-title>
          <v-card-text>You've added a new task or goal! To see it, check out the home screen. </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/page1"> <v-btn color="green darken-1" flat @click.native="dialog = false">New Task</v-btn></router-link>
            <router-link to="/"> <v-btn color="green darken-1" flat @click.native="dialog = false">Home</v-btn></router-link>
          </v-card-actions>
        </v-card>
      </v-dialog>

  
    
         <v-dialog v-model="dialog" persistent max-width="290">
        <v-btn  v-if="selectedcategory == 'Set Monthly Spending Goal'" color="blue darken-4" @click="changegoal" slot="activator" dark>Submit</v-btn>
        <v-card>
          <v-card-title class="headline">Success</v-card-title>
          <v-card-text>You've added a new task or goal! To see it, check out the home screen. </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/page1"> <v-btn color="green darken-1" flat @click.native="dialog = false">New Task</v-btn></router-link>
            <router-link to="/"> <v-btn color="green darken-1" flat @click.native="dialog = false">Home</v-btn></router-link>
          </v-card-actions>
          
        </v-card>
      </v-dialog> -->
      
      </v-card-actions>
    </form>
</v-container>

     <v-bottom-nav >
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
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
export default {
  name: 'page1',
  data () {
    return{
    // cat_items: ['Add New Category','Academics', 'Spending', 'Medicine'],
    cat_items:[],
    months:['January', 'February', 'March', 'April',"May","June","July","August","September","October","November","December"],
    metric_items: ['Dollars', 'Homework', 'Exam', 'Pills', 'Add New Metric'],
    repeat_items: ['None', 'Daily'],
     newTodo: '',
     details:'',
      todo: [],
      todos: [],
      moneygoal:{},
      day: this.todoDay(),
      month:this.todomonth(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear(),
       date1: new Date().toISOString().substr(0, 10),
    menu: false,
    dialog: false,
    modal: false,
    menu2: false,
     time: null,
      menu3: false,
      menu4: false,
      modal2: false,
      resultdict:{},
      daterange:'',
      selectedmetric:'',
      selectedcategory:'',
      selectedmonth:'',
      selectedrepeated:'',
      money:0,
      range: [],
      newSpend: '',
      enddate:new Date().toISOString().substr(0, 10),
      dateRangeOptions: {
        startDate: format(subDays(new Date(), 7), 'YYYY-MM-DD'),
        endDate: format(new Date(), 'YYYY-MM-DD'),
        maxDate:'2050-12-31',
        format: 'MM/DD/YYYY',
        presets: [
          {
            label: 'Today',
            range: [
              format(new Date(), 'YYYY-MM-DD'),
              format(new Date(), 'YYYY-MM-DD'),
            ],
          },
          {
            label: 'Yesterday',
            range: [
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
            ],
          },
          {
            label: 'Last 30 Days',
            range: [
              format(subDays(new Date(), 30), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
            ],
          },
        ],
      },
      newCategory: '',
      // datamonth:this.createmonth()



      // date1:''
    }
  },
    methods: {
      medicine(){
      console.log('medicine');
      if (JSON.parse(localStorage.getItem('todojson'))){
      console.log('yes');
      this.resultdict=JSON.parse(localStorage.getItem('todojson'));
      console.log(this.resultdict);
      console.log(this.date1);
      var difference=this.diffdays(this.date1,this.enddate);
      console.log(difference);
      if (this.resultdict.hasOwnProperty(this.date1)) {
        console.log(this.selectedcategory);
          // this.cat_items.push(this.newCategory);
          //  this.$set(this.$data, 'cat_items', this.cat_items);
          //  localStorage.setItem('cat_items', JSON.stringify(this.cat_items));
          //  console.log('newcategory');
        // console.log(this.cat_items);
           this.resultdict[this.date1].push({
           title: this.newTodo,
        details:this.details,
        date:this.date1,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category: this.selectedcategory,
        repeated:this.selectedrepeated,
        enddate:this.enddate,
        money:this.money,
        spend_goal: this.newSpend,
        // month:this.datamonth
      

        })
         var split=this.date1.split('-')
        var repeat = new Date(split[0],split[1]-1,split[2]);
          for (var i = 0;i<difference;i++){
          console.log('d');
       
        // console.log(this.resultdict);
        repeat.setDate(repeat.getDate() + 1);

        var y = repeat.getFullYear(),
    m = repeat.getMonth() + 1, // january is month 0 in javascript
    d = repeat.getDate();
var pad = function(val) { var str = val.toString(); return (str.length < 2) ? "0" + str : str};
 var dateString = [y, pad(m), pad(d)].join("-");
        console.log(dateString);
        if (!this.resultdict.hasOwnProperty(dateString)){
             this.resultdict[dateString]=[];
    
     
        this.resultdict[dateString].push({
        title: this.newTodo,
        details:this.details,
        date:dateString,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category: this.selectedcategory,
        repeated:this.selectedrepeated,
        enddate:this.enddate,
        money:this.money,
        spend_goal: this.newSpend
        // month:this.datamonth
     

        })
            }
          

            else{
   this.resultdict[dateString].push({
        title: this.newTodo,
        details:this.details,
        date:dateString,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category: this.selectedcategory,
        repeated:this.selectedrepeated,
        enddate:this.enddate,
        money:this.money,
        spend_goal: this.newSpend
        // month:this.datamonth
     

        })
            }
            
      }
      
      }

           else if (!this.resultdict.hasOwnProperty(this.date1)){


              this.resultdict[this.date1]=[];
              this.resultdict[this.date1].push({
           title: this.newTodo,
        details:this.details,
        date:this.date1,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category: this.selectedcategory,
        repeated:this.selectedrepeated,
        enddate:this.enddate,
        money:this.money,
        spend_goal: this.newSpend
              });
             var split=this.date1.split('-')
        var repeat = new Date(split[0],split[1]-1,split[2]);
          for (var i = 0;i<difference;i++){
          console.log('d');
       
        // console.log(this.resultdict);
        repeat.setDate(repeat.getDate() + 1);

        var y = repeat.getFullYear(),
    m = repeat.getMonth() + 1, // january is month 0 in javascript
    d = repeat.getDate();
var pad = function(val) { var str = val.toString(); return (str.length < 2) ? "0" + str : str};
 var dateString = [y, pad(m), pad(d)].join("-");
        console.log(dateString);
        console.log(this.resultdict);
        if (!this.resultdict.hasOwnProperty(dateString)){
             this.resultdict[dateString]=[];
    
     
        this.resultdict[dateString].push({
        title: this.newTodo,
        details:this.details,
        date:dateString,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category: this.selectedcategory,
        repeated:this.selectedrepeated,
        enddate:this.enddate,
        money:this.money,
        spend_goal: this.newSpend
        // month:this.datamonth
     

        })
            }

            else{
   this.resultdict[dateString].push({
        title: this.newTodo,
        details:this.details,
        date:dateString,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category: this.selectedcategory,
        repeated:this.selectedrepeated,
        enddate:this.enddate,
        money:this.money,
        spend_goal: this.newSpend
        // month:this.datamonth
     

        })
            }
             }
                }
           
      
            }
      // console.log(this.todos);


     

      else{
        console.log('repeat');
        var split=this.date1.split('-')
        var repeat = new Date(split[0],split[1]-1,split[2]);
        var difference=this.diffdays(this.date1,this.enddate);
          for (var i = 0;i<difference;i++){
          console.log('d');
       
        // console.log(this.resultdict);
        repeat.setDate(repeat.getDate() + 1);

        var y = repeat.getFullYear(),
    m = repeat.getMonth() + 1, // january is month 0 in javascript
    d = repeat.getDate();
var pad = function(val) { var str = val.toString(); return (str.length < 2) ? "0" + str : str};
 var dateString = [y, pad(m), pad(d)].join("-");
        console.log(dateString);
        this.resultdict[dateString]=[];
        this.resultdict[dateString].push({
        title: this.newTodo,
        details:this.details,
        date:dateString,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category: this.selectedcategory,
        repeated:this.selectedrepeated,
        enddate:this.enddate,
        money:this.money,
        spend_goal: this.newSpend,

      })
      
          
      }
      }
      this.resultdict=JSON.stringify(this.resultdict);
      localStorage.setItem('todojson',this.resultdict);

      
      this.newTodo = '';
      this.details = '';
      this.date1='';
      this.time='';
      this.done='';
      this.selectedmetric='';
      this.selectedcategory='';
      this.selectedrepeated='';
      },
      //  this.money='';,
      diffdays(startdate,enddate){
      var splita=startdate.split('-');
      var splitb=enddate.split('-');
      var datea = new Date(splita[0],splita[1]-1,splita[2]);
      var dateb = new Date(splitb[0],splitb[1]-1,splitb[2]);
      

      var timeDiff = Math.abs(datea.getTime() - dateb.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

      return diffDays;
      },



    changegoal() {

      // localStorage.removeItem('monthlyspending');
      // var get=JSON.parse(localStorage.getItem('todojson'));
      // console.log(get);
      if (JSON.parse(localStorage.getItem('monthlyspending'))){
      this.moneygoal=JSON.parse(localStorage.getItem('monthlyspending'));
      console.log(this.moneygoal);

      if (this.moneygoal.hasOwnProperty(this.selectedmonth)){
      this.moneygoal[this.selectedmonth]={
         done: false,
        category:this.selectedcategory,
        month:this.selectedmonth,
        spend_goal: this.newSpend
      };}

        else if (!this.moneygoal.hasOwnProperty(this.selectedmonth)){
          // this.moneygoal[this.selectedmonth]=[];
      this.moneygoal[this.selectedmonth]={
         done: false,
        category:this.selectedcategory,
        month:this.selectedmonth,
        spend_goal: this.newSpend
      };}
      }
      else{
        //  this.todos=get;
      console.log('yes');
      //  this.moneygoal[this.selectedmonth]=[];
      //  console.log(this.selectedmonth);
      this.moneygoal[this.selectedmonth]={
        done: false,
        category:this.selectedcategory,
        month:this.selectedmonth,
        spend_goal: this.newSpend
      };}
      console.log(this.moneygoal);
      this.moneygoal=JSON.stringify(this.moneygoal);
      console.log(this.moneygoal);
      localStorage.setItem('monthlyspending',this.moneygoal);

      
      this.selectedcategory = '';
      this.selectedmonth = '';
      this.newSpend='';
  
    },

        addTodo() {
    
      // localStorage.removeItem('todojson');
      // var get=JSON.parse(localStorage.getItem('todojson'));
      // console.log(get);
      console.log(this.enddate);
      if (JSON.parse(localStorage.getItem('todojson'))){
      this.resultdict=JSON.parse(localStorage.getItem('todojson'));
      console.log(this.resultdict);
      console.log(this.date1);

      if (this.resultdict.hasOwnProperty(this.date1) && this.selectedcategory == 'Add New Category') {
        
          this.cat_items.push(this.newCategory);
          //  this.$set(this.$data, 'cat_items', this.cat_items);
           localStorage.setItem('cat_items', JSON.stringify(this.cat_items));
           console.log('newcategory');
        console.log(this.cat_items);
           this.resultdict[this.date1].push({
           title: this.newTodo,
        details:this.details,
        date:this.date1,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category: this.newCategory,
        repeated:this.selectedrepeated,
        money:this.money,
        spend_goal: this.newSpend,
        // month:this.datamonth
        
        })
      }
      if (this.resultdict.hasOwnProperty(this.date1) && this.selectedcategory != 'Add New Category'){
        this.resultdict[this.date1].push({
           title: this.newTodo,
        details:this.details,
        date:this.date1,
        time:this.time,
        
        done: false,
        metric:this.selectedmetric,
        category:this.selectedcategory,
        repeated:this.selectedrepeated,
        money:this.money,
        spend_goal: this.newSpend,
        // month:this.datamonth
        })
      }
      else if (!this.resultdict.hasOwnProperty(this.date1) && this.selectedcategory != 'Add New Category'){
        console.log("else");
        console.log(this.resultdict);
        console.log(this.date1);

          this.resultdict[this.date1]=[];
this.resultdict[this.date1].push({
        title: this.newTodo,
        details:this.details,
        date:this.date1,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category:this.selectedcategory,
        repeated:this.selectedrepeated,
        money:this.money,
        spend_goal: this.newSpend,
        // month:this.datamonth
        })
      }
       

      else if (!this.resultdict.hasOwnProperty(this.date1) && this.selectedcategory == 'Add New Category'){
        console.log("else");
        console.log(this.resultdict);
        console.log(this.date1);
        this.cat_items.push(this.newCategory);
        console.log(this.cat_items);
        localStorage.setItem('cat_items', JSON.stringify(this.cat_items));
          //  this.$set(this.$data, 'cat_items', this.cat_items);
          this.resultdict[this.date1]=[];
this.resultdict[this.date1].push({
        title: this.newTodo,
        details:this.details,
        date:this.date1,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category:this.newCategory,
        repeated:this.selectedrepeated,
        money:this.money,
        spend_goal: this.newSpend,
        // month:this.datamonth
        })
      }

            }
        else if (this.selectedcategory == 'Add New Category') {
        console.log("else");
        console.log(this.resultdict);
        console.log(this.date1);
        this.cat_items.push(this.newCategory);
        console.log(this.cat_items);
          //  this.$set(this.$data, 'cat_items', this.cat_items);
          localStorage.setItem('cat_items', JSON.stringify(this.cat_items));

          this.resultdict[this.date1]=[];
this.resultdict[this.date1].push({
        title: this.newTodo,
        details:this.details,
        date:this.date1,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category:this.newCategory,
        repeated:this.selectedrepeated,
        money:this.money,
        spend_goal: this.newSpend,
        // month:this.datamonth
        })
      }
       
      
      else if (this.selectedcategory != 'Add New Category'){
        //  this.todos=get;
      console.log('yes');
      console.log(this.resultdict);
      console.log(this.date1);
      this.resultdict[this.date1]=[];
      this.resultdict[this.date1].push({
        title: this.newTodo,
        details:this.details,
        date:this.date1,
        time:this.time,
        done: false,
        metric:this.selectedmetric,
        category:this.selectedcategory,
        repeated:this.selectedrepeated,
        money:this.money,
        spend_goal: this.newSpend,
        // month:this.datamonth
        
      });
      }
      // console.log(this.todos);
      this.resultdict=JSON.stringify(this.resultdict);
      localStorage.setItem('todojson',this.resultdict);

      
      this.newTodo = '';
      this.details = '';
      this.date1='';
      this.time='';
      this.done='';
      this.selectedmetric='';
      this.selectedcategory='';
      this.selectedrepeated='';
      //  this.money='';

    },
    removeTodo(index) {
      this.todos.splice(index, 1);
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
    createmonth() {
      // var d = this.date1;
           var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      console.log(this.date1);
      var date=this.date1.split('-');
      var d = new Date(date[0],date[1]-1,date[2]);
    // //       // console.log(d);
      // data[i].month=
      return months[d.getMonth()];
    },
    onDateRangeChange(range) {
      this.range = range;
    }
  },
  mounted (){
    // ['Add New Category','Academics', 'Spending', 'Medicine'],
    // localStorage.removeItem('cat_items');
    if (localStorage.getItem('cat_items') === null){
      var cat_items = ['Add New Category','Academics', 'Set Monthly Spending Goal', 'Medicine'];
      localStorage.setItem('cat_items', JSON.stringify(cat_items));
      // this.cat_items = localStorage.cat_items;
      this.cat_items = JSON.parse(localStorage.getItem("cat_items"));
      console.log(this.cat_items);
      }
    else {
      // localStorage.setItem('cat_items', JSON.stringify(cat_items));
      // this.cat_items = localStorage.cat_items;
      this.cat_items = JSON.parse(localStorage.getItem("cat_items"));
      console.log(this.cat_items);
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

.inputPrice input[type='number'] {
    -moz-appearance:textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.centername {
  text-align: center;
}

.submit_button {
  padding: 10px;
}

</style>