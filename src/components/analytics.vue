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

                      <v-subheader id="header">Select a Month to see Analytics 
                           </v-subheader>
        
    <v-flex>
        <v-select
          :items="month_items"
          label="Month"
          v-model="selectedmonth"
          v-on:change="showbars(selectedmonth)"
        ></v-select>
      </v-flex>
          <v-flex>
        <!-- <v-btn  id="submit_button"  color="blue darken-4" slot="activator" dark>Submit</v-btn> -->
   </v-flex>
    <div id="analytics">
    

        <!-- <div class="progress">
            <div id="vd"></div>
            </div>
        
        <v-progress-linear value="41.66666666666667" color="blue-grey"></v-progress-linear>
        
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
        <v-progress-linear  v-model="academic" color="blue-grey"></v-progress-linear>
       
       
        <v-progress-linear  v-model="money" color="blue-grey"></v-progress-linear>
         <v-progress-linear  v-model="medicine" color="blue-grey"></v-progress-linear>
         -->

        
        </div>  
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
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//  import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify)

// get values for the progress bars from local storage 
// show or hide each available progress bar based on whether or not user has defined categories for checking analytics 
// metrics are how many goals were checked off for each category 
// Categories are "academics","spending","Medicine", and "Add New Category" 

export default {
  name: 'MonthlyAnalytics',
  //goal:0;
  //actual:0;
  data () {
      return {
        academicgoal: 0,
        medicinegoal:0,
        moneygoal:0,
        academic:0,
        medicine:0,
        money:0,
        selectedmonth:'',
        day: this.todoDay(),
        month:this.todomonth(),
        date: new Date().getDate(),
        ord: this.nth(new Date().getDate()),
        year: new Date().getFullYear(),
        month_items:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      }
  }, 

  methods: {
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
 
       showbars(month){

         document.getElementById("analytics").innerHTML = "";
           var data=JSON.parse(localStorage.getItem('largedict'));

           if(data.hasOwnProperty(month)){
               this.createBars(data[month]);
           }

           
        //    else if (!data.hasOwnProperty(month){
        //        document.getElementById("analytics").innerHTML = "";
        //    }
           
           

       },
       remove(){
 document.getElementById("analytics").innerHTML = "";
       },
       createBars(categoryDict) {
        var main = document.getElementById("analytics");
        var keys = Object.keys(categoryDict);
        for (var k in keys) {
            var section = document.createElement("div");
            main.appendChild(section);
            section.setAttribute("class", "category");
            // setting the progress bar title for each category
            var header = document.createElement("h1");
            var headerText = document.createTextNode(keys[k]+" "+categoryDict[keys[k]][1]+"/"+categoryDict[keys[k]][0]);
            console.log(headerText);
            header.appendChild(headerText);
            section.appendChild(header);
            // set default progress bar for each category 
            var bar = document.createElement("div");
            section.appendChild(bar);
            bar.setAttribute("class", "progress");
            //var index = keys.indexOf(k);
            //document.getElementsByTagName("div")[index+1].setAttribute("class","progress");
            var progress = document.createElement("div");
            bar.appendChild(progress);
           
            var percentProgress = categoryDict[keys[k]][1]/categoryDict[keys[k]][0]*100;
            if (percentProgress > 100) {
                console.log('100');
                progress.setAttribute("class", "redBar");
                // var headerText2 = document.createTextNode("You have spent over your budget!");
                // header.appendChild(headerText2);
                // section.appendChild(headerText2);
                var w = percentProgress.toString() + "%";
                progress.style.width = w;
                progress.style.height = "40px";
            }
            else { 
                console.log("no");
                progress.setAttribute("class", "greenBar");
                var w = percentProgress.toString() + "%";
                progress.style.width = w;
                progress.style.height = "40px";
            };
            
        }
       }
  },

  mounted() {

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // var dictionary={};
    // var data=JSON.parse(localStorage.getItem('todojson'));
    // console.log(data);
    // //  for (var i=0;i<data.length;i++){
    // //       var date=data[i].date.split('-');
    // //       var d = new Date(date[0],date[1]-1,date[2]);
    // //       // console.log(d);
    // //       data[i].month=months[d.getMonth()];
    // //     }
    // // console.log(data);
    // // var taskbymonth=_.groupBy(data,"month");
    // // console.log(taskbymonth);
    // for (var key in data){
    //     console.log(data[key]);
    //     if (data[key]["category"]=='Academics'){
    //         console.log('yes');
    //         this.academicgoal+=1;
    //     }
    //     // console.log(this.academicgoal);
    //      if (data[key]["category"]=='Academics'&& data[key]["done"]=='true'){
    //         console.log('yes');
    //         this.academic+=1;
    //     }
    //      if (data[key]["category"]=='Medicine'){
    //         console.log('yes');
    //         this.medicinegoal+=1;
    //     }
    //     if (data[key]["category"]=='Medicine'&& data[key]["done"]=='true'){
    //     console.log('yes');
    //     this.medicine+=1;
    //     }

    //        if (data[key]["category"]==){
    //     console.log('yes');
    //     this.medicine+=1;
    //     }
    //    dictionary.month=data[key].month;
    //    dictionary.month.push

    // }

    // for (var key in taskbymonth){
    //     for (var task in taskbymonth[key]){
    //         console.log(task);
    //     }
    // }
    // completed=0;
    // for (var i=0; i<data.length;i++){
    //     console.log(data[i]);
    //     if (data[i]["category"]=="Academic" &&data[i]["done"]=="True" ){
    //         completed=completed+1;

    //     }
    // }


    function createBars(categoryDict) {
        var main = document.getElementById("analytics");
        var keys = Object.keys(categoryDict);
        for (var k in keys) {
            var section = document.createElement("div");
            main.appendChild(section);
            section.setAttribute("class", "category");
            // setting the progress bar title for each category
            var header = document.createElement("h1");
            header.appendChild(headerText);
            section.appendChild(header);
            // set default progress bar for each category 
            var bar = document.createElement("div");
            section.appendChild(bar);
            bar.setAttribute("class", "progress");
            //var index = keys.indexOf(k);
            //document.getElementsByTagName("div")[index+1].setAttribute("class","progress");
            var progress = document.createElement("div");
            bar.appendChild(progress);
            progress.setAttribute("class", "greenBar");
            var percentProgress = categoryDict[keys[k]][1]/categoryDict[keys[k]][0]*100;
            var w = percentProgress.toString() + "%";
            progress.style.width = w;
            progress.style.height = "40px";
        };
    };

    function createDict(json) {
        var newDict = {};
        for (var index in json) {
            var cat = json[index]["category"];
            if (cat in newDict) {
                var numTasks = newDict[cat][0];
                var completed = newDict[cat][1];
                var newNumTasks = numTasks+1;
                if (json[index]["done"]==true){
                    var newCompleted = completed + 1;
                } else {
                    var newCompleted = completed;
                }
                var newVal = [];
                newVal.push(newNumTasks);
                newVal.push(newCompleted);
                // WAY TO CHANGE NUM OF COMPLETED TASKS 
                newDict[cat] = newVal;
            } else {
                var newVal = [1];
                if (json[index]["done"]==true) {
                    newVal.push(1);
                } else {
                    newVal.push(0);
                }
                newDict[cat] = newVal;
            }
        };
        return JSON.stringify(newDict);
    };

    function changeProgress(newVal){
            var current = document.getElementById('vd');
            var val = newVal.toString();
            var w = val + "%";
            document.getElementById('vd').style.width=w;
        };

    var t = [ { "title": "dfadf", "details": "dfdasf", "date": "2018-11-11", "time": "11:55", "done": true, "metric": "", "category": "Academics", "repeated": "Daily" }, { "title": "dfadf", "details": "dfdasf", "date": "2018-11-11", "time": "11:55", "done": false, "metric": "", "category": "Academics", "repeated": "Daily" }]
    var h = createDict([{ "title": "dfadf", "details": "dfdasf", "date": "2018-11-11", "time": "11:55", "done": true, "metric": "", "category": "Academics", "repeated": "Daily" }]);
    var x = createDict(t);
    localStorage.setItem("h", h);
    localStorage.setItem("x", x);
    //localStorage.setItem('value', 30);
    //var newVal = localStorage.getItem('value');
    //changeProgress(newVal);

    var test = {
        "Spending":[12,5],
        "Money":[15,14],
        
    };
    //   var test1 = {
    //     Spending:[12,5],
    //     Money:[15,14],
    //     Medicine:[2,1]
    // };
    // var tests=_.groupBy(test1,"Month");
    // console.log(tests);
   

    var data=JSON.parse(localStorage.getItem('todojson'));
    var money=JSON.parse(localStorage.getItem('moneyspent'));
    var goal=JSON.parse(localStorage.getItem('monthlyspending'));
    console.log(money);
    console.log(goal);
   var largedict={};
   var newDict = {};
   var newmoney={}
       
     
    //    console.log(money);
        //  largedict[cat[i]['month']]
    //     newmoney['Spending']=[];
    //     newmoney['Spending'][1]=totalspending;
    //     newmoney['Spending'][1]=totalspending;
    //     // createBars(newmoney);

    //    console.log(totalspending);
    //    console.log(newmoney);
       for (var index in data) {
            console.log(index);
            var cat = data[index];
            console.log(cat);
            var numTasks=0
            var completed=0
            for (var i=0;i<cat.length;i++){
                console.log(cat[i]['category']);
               var category= cat[i]['category']
            var date=cat[i]['date'].split('-');
      var d = new Date(date[0],date[1]-1,date[2]);
    // //       // console.log(d);
      // data[i].month=
      cat[i]['month']= months[d.getMonth()];
      console.log(newDict);
            if ( newDict.hasOwnProperty(cat[i]['month']) && newDict[cat[i]['month']].hasOwnProperty(category)) {
                console.log("worktime");
                var numTasks = newDict[cat[i]['month']][category][0];
                console.log(numTasks);
                var completed = newDict[cat[i]['month']][category][1];
                console.log(completed);
                var newNumTasks = numTasks+1;
                if (cat[i]['done']==true){
                    var completed = completed + 1;
                } 
                var newVal = [];
                newVal.push(newNumTasks);
                newVal.push(completed);
                // WAY TO CHANGE NUM OF COMPLETED TASKS 
                newDict[cat[i]['month']][category] = newVal;
            }
              else if ( newDict.hasOwnProperty(cat[i]['month']) && !newDict[cat[i]['month']].hasOwnProperty(category)) {
                console.log(category);
                // newDict[cat[i]['month']][category]={};
                newDict[cat[i]['month']][category]=[];
                newDict[cat[i]['month']][category].splice( 1, 0, 0 );
                newDict[cat[i]['month']][category].splice( 0, 0, 1 );
                var numTasks = newDict[cat[i]['month']][category][0];
                // console.log(numTasks);
                var completed = newDict[cat[i]['month']][category][1];
                // console.log(completed);
                // var numTasks = numTasks+1;
                if (cat[i]['done']==true){
                    var completed = completed + 1;
                }
                var newVal = [];
                newVal.push(numTasks);
                newVal.push(completed);
                // console.log(newVal);
                // WAY TO CHANGE NUM OF COMPLETED TASKS 
                newDict[cat[i]['month']][category] = newVal;
            }

             
            else {
                var newVal = [];
                // var numTasks = newDict[category][0];
                // var completed = newDict[category][1];
                newVal.splice( 0, 0, 1);
                newVal.splice( 1, 0, 0);
                if (cat[i]['done']==true) {
                    newVal.splice( 1, 0, 1 );
                } 
                console.log(newVal);
                newDict[cat[i]['month']]={};
                newDict[cat[i]['month']][cat[i]['category']] = newVal;
            }
                console.log(newDict);
                // largedict[cat[i]['month']]=newDict;
                
            }
        // largedict[]
        largedict=newDict;
        };

 


    //    var totalspending=0
       for ( var amount in money){
           console.log((amount));
           var moneydata=money[amount];
           console.log(money[amount]['spent']);
        //    totalspending+=parseFloat(money[amount]['spent'])
        //    console.log(totalspending);

        for (var i=0;i<moneydata.length;i++){

           var date=moneydata[i]['date'].split('-');
      var d = new Date(date[0],date[1]-1,date[2]);
          console.log(d);
      // data[i].month=
      
     moneydata[i]['month']= months[d.getMonth()];
        console.log(largedict[moneydata[i]['month']]);
        // console.log(goal[moneydata[i]['month']]);
      if (largedict[moneydata[i]['month']] && largedict[moneydata[i]['month']].hasOwnProperty('Spending') && goal.hasOwnProperty([moneydata[i]['month']])){
        //   largedict[money[amount]['month']]['Spending']=[0,0];
        console.log('yes')
          largedict[moneydata[i]['month']]['Spending'][1]+=parseFloat(moneydata[i]['spent'])
          largedict[moneydata[i]['month']]['Spending'][0]=parseFloat(goal[moneydata[i]['month']]['spend_goal']);

       }

      else if (largedict[moneydata[i]['month']] && !largedict[moneydata[i]['month']].hasOwnProperty('Spending')&& !goal){
          largedict[moneydata[i]['month']]['Spending']=[0,0];
          largedict[moneydata[i]['month']]['Spending'][1]+=parseFloat(moneydata[i]['spent']);
          largedict[moneydata[i]['month']]['Spending'][0]=1000;

}
              else if (largedict[moneydata[i]['month']] && !largedict[moneydata[i]['month']].hasOwnProperty('Spending')&& goal.hasOwnProperty([moneydata[i]['month']])){
          largedict[moneydata[i]['month']]['Spending']=[0,0];
          largedict[moneydata[i]['month']]['Spending'][1]+=parseFloat(moneydata[i]['spent']);
                 largedict[moneydata[i]['month']]['Spending'][0]=parseFloat(goal[moneydata[i]['month']]['spend_goal']);
}
                  else if (largedict[moneydata[i]['month']] && largedict[moneydata[i]['month']].hasOwnProperty('Spending')&& !goal){
        //   largedict[moneydata[i]['month']]['Spending']=[0,0];
          largedict[moneydata[i]['month']]['Spending'][1]+=parseFloat(moneydata[i]['spent']);
                 largedict[moneydata[i]['month']]['Spending'][0]=1000;
                  }
    //  else  if (!largedict[money[amount]['month']] && !largedict[money[amount]['month']].hasOwnProperty('Spending') && goal.hasOwnProperty([money[amount]['month']])){
    //     //   largedict[money[amount]['month']]['Spending']=[0,0];
    //     console.log('yes')
    //       largedict[money[amount]['month']]['Spending'][1]+=parseFloat(money[amount]['spent'])
    //       largedict[money[amount]['month']]['Spending'][0]=parseFloat(goal[money[amount]['month']]['spend_goal']);

    //    }
     
      else if (Object.keys(largedict).length === 0 && !goal){
        //    largedict[cat[i]['month']]
        console.log("nomonth");
        largedict[moneydata[i]['month']]={};
          largedict[moneydata[i]['month']]['Spending']=[0,0];
          largedict[moneydata[i]['month']]['Spending'][1]+=parseFloat(moneydata[i]['spent']);
          largedict[moneydata[i]['month']]['Spending'][0]=1000;

}
              else if (Object.keys(largedict).length === 0 && goal.hasOwnProperty([moneydata[i]['month']])){
                  largedict[moneydata[i]['month']]={}
          largedict[moneydata[i]['month']]['Spending']=[0,0];
          largedict[moneydata[i]['month']]['Spending'][1]+=parseFloat(moneydata[i]['spent']);
                 largedict[moneydata[i]['month']]['Spending'][0]=parseFloat(goal[moneydata[i]['month']]['spend_goal']);
}
//                   else if (!largedict[money[amount]['month']] && !largedict[money[amount]['month']].hasOwnProperty('Spending')&& !goal.hasOwnProperty([money[amount]['month']])){
//           largedict[money[amount]['month']]['Spending']=[0,0];
//           largedict[money[amount]['month']]['Spending'][1]+=parseFloat(money[amount]['spent']);
//                  largedict[money[amount]['month']]['Spending'][0]=1000;
 
//     //    if


// }
       }
         
        //   localStorage.removeItem('largedict');
            // localStorage.setItem("largedict", JSON.stringify(largedict)); 
        // return JSON.stringify(newDict);
    //  for (var info in largedict){
    //      console.log(largedict[info]);
    //      createBars(largedict[info]);
    //  }
       }
        console.log(largedict);
        localStorage.setItem("largedict", JSON.stringify(largedict)); 
}
}
</script>

<style>
h1 {
    display: block;
    padding: 2%;
}

.category {
    display: block;
}

.progress {
    width: 90%;
    display: block;
    height: 40px;
    background-color: lightgray;
    margin-left: auto;
    margin-right: auto;
    border-radius: 75px;
}
.barText {
    position: relative;
    z-index: 1;
    top: -35px;
}
#vd {
    width: 10%;
    height:40px;
    background-color: green;
}
.greenBar {
    border-radius: 75px;
    background-image: linear-gradient(to right, lightblue, blue);
    max-width: 100%;
}
.redBar {
    border-radius: 75px;
    background-image: linear-gradient(to right, pink, red);
    max-width: 100%;
}
.centername {
  text-align: center;
}
#header{
  font-size: 20px;
  text-align: center;
}
#selectedmonth {
    width: 75%;
    padding-left: 100px;
}
</style>
