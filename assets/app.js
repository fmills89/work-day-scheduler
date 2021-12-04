// Variables that will target DOM elements
var currentDayEl = document.querySelector("#currentDay");
const m = moment().format('LLL');
    currentDayEl.textContent = m;

// empty array for calendar
var calendar = [];
var plannerData = "";
var displayHour = 0;
var ampm = "";

// for loop to get hours 9 thru 5p
for (time = 9; time <= 17; time++){
    console.log(time);

    // sets index 
    var id = time - 9;
    console.log(id);

    // if statement to assign am/pm
    if (time === 12){
        display = 12
        ampm = "pm";
    } else if (time > 12) {
        displayHour = time - 12;
        ampm = "pm";
    }else if (time < 12) {
        displayHour = time;
        ampm = "am";
    }

    displayHour = displayHour.toString()

    // object to push to open calendar array
    plannerData = {
        id: id,
        displayHour: displayHour,
        time: time,
        ampm: ampm,
        plannerData: plannerData
    }

    // pushing object planner data to empty calendar array
    calendar.push(plannerData);
}

console.log(calendar);

 // saving calendar data 
savePlannerData = () => {
    localStorage.setItem("calendar", JSON.stringify(calendar));
};
// function to display hours
displayPlannerData = () => {
    calendar.forEach(hour => {
        $('#' + hour.id).val(hour.plannerData)
    });
}

// loading info from localStorage
loadPlannerData = () => {
    var dataLoaded = JSON.parse(localStorage.getItem("calendar"));

    if (dataLoaded) {
        calendar = dataLoaded;
    }

    savePlannerData();
    displayPlannerData();
};

loadPlannerData();

calendar.forEach(hour => {
    // creating row
    var timeRow = $("<form>")
        .addClass("row");
    
    // using jquery to grab container and append time row
    $(".container").append(timeRow);

    // 
    var timeField = $("<div>")
        .addClass("col-md-1 hour")
        .text(hour.displayHour + hour.ampm);
    
    // create planner data - inserting div/textarea
    var hourInput = $("<div>")
        .addClass("col-md-9 description p-0")
    var hourData = $("<textarea>");
        hourData.attr("id", hour.id);

    // applied present/past/future classes based on time
        if (hour.time == moment().format("HH")) {
            hourData.addClass("present")
        } else if (hour.time < moment().format("HH")) {
            hourData.addClass("past")
        } else if (hour.time > moment().format("HH")) {
            hourData.addClass("future")
        }

        hourInput.append(hourData);

        // 
        var saveIcon = $("<i class='far fa-save fa-lg'></i>")
        var saveEnd = $("<button>")
            .addClass("col-md-1 saveBtn");

        saveEnd.append(saveIcon);
        timeRow.append(timeField, hourInput, saveEnd);
})

// when save button is clicked 
$('.saveBtn').on("click", e => {
    e.preventDefault();

    var saveIndex = $(this).siblings(".description").children().attr("id");
    calendar[saveIndex].calender = $(this).sibling(".description").children().val();
    savePlannerData();
    displayPlannerData();
})





