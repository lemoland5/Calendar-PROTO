console.log("DATE.JS IS RUNNING");

// GREGORIAN CALENDAR FUCKERY --------------------------------------------------------------
Date.prototype.isLeapYear = function() {
    if(this.getFullYear() % 4 == 0 && this.getFullYear() % 400 != 0) return true;
    else return false;
}

Date.prototype.getDays = function() {
    if(this.getMonth() + 1 != 2){
        if(this.getMonth() + 1 <= 7) {
            if(this.getMonth() + 1 % 2 != 0) return 31;
            else return 30;
        }
        else{
            if(this.getMonth() + 1 % 2 == 0) return 31;
            else return 30;
        }
    }
    else{
        if(this.isLeapYear()) return 29;
        else return 28;
    }
}

// COMPARISON --------------------------------------------------------------------
Date.prototype.dayDifference = function(day2) {
    return Math.ceil((day2.getTime() - this.getTime()) / (1000 * 3600 * 24));
}

// PARSING ----------------------------------------------------------------------
const parseDate = t => {
    let workingDay = new Date();
    let dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
    let dateRegexEx = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    
    if(t == 'tomorrow') workingDay.setDate(workingDay.getDate() + 1);
    if(t == 'yesterday') workingDay.setDate(workingDay.getDate() - 1);

    if(dateRegex.test(t) || dateRegexEx.test(t)) workingDay = new Date(t);
    

    return workingDay;
}