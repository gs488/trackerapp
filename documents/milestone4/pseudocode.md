**Pseudocode for Final Redesign**

*Home Page*
- open on load
- list of tasks
- separate by due date entered on Task Input
- update(value, index) method: if user clicks checkbox, strike through text, but keep item on display. if user unclicks checkbox, remove strikethrough. when user clicks checkbox, the number of tasks completed in analytics page increases and the bar gets updated accordingly. when user unclicks the checkbox, the number of tasks completed in analytics page decreases and the bar gets updated automatically.  
    - create a variable and set JSON.stringify(data) to 'todojson' 
    - log data and value on console 
    - set 'todojson'  
- removeToDo(value, index) method: if user presses red 'x,' then remove item from display. still keep item in localStorage. when user removes the task, the number of total tasks for the respective category in analytics page decreases, and the bar gets updated accordingly.
    - create a variable and put the index of the task to remove
    - check if the variable contains the right index
    - remove
- todoDay/Month() method: display current date on header, in Month Day, Year format
- custom_sort(a, b) method: if due date entered on Task Input is earlier for one task than the other, display earlier task first
- mounted() method: update Home to display all items added through Task Input and stored in localStorage on load, sorted by earliest to latest due date (NOT entry date)

*Task Input Page*
- addToDo() method: if user has entered sufficient information, create JSON object for inputted data to be displayed on Home. If the due date is not specified, the due date is set to be the current day that task was added. 
- medicine() method: if user selects 'daily' repeat option, display task every day until specified end date.
- changeGoal() method: set default amount for any given month's spending. if a monthly spending goal is already written, overwrite with newly input goal. use this in Analytics to track spending against monthly goal
- Buttons
    - If Medicine and Daily, then @click = medicine()
    - If Medicine and None, then @click = addTodo()
    - If not Medicine and not Set Monthly Spending Goal, then @click = addTodo()
    - If Set Monthly Spending Goal, then @click = changeGoal()

*Spending Page*
- monthly goal displayed on top
- structured very similarly to Home page

*Analytics Page*
- showBars(month) method: allow user to select month they would like to see. if there is pertaining Academics/Spending/Medicine data, display the amount completed against total inputted amount. 
- remove() method: clears the bars if no data is found for a relevant month.
- createBars(categoryDict) method: initialize the bars that will show progress. the bar is created based on the number of total inputted tasks and the number of completed tasks. in case of spending, the amount of spending goal and the amount that user spent. 
- createDict(json) method: data structure for progress bars.
- changeProgress(newVal) method: update the progress for each bar present by presenting amount completed against total amount. if goal is exceeded, bar is colored red. this takes data from localStorage if has been updated in Home Page. 
