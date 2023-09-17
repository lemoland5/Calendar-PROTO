const monthbox = document.getElementById('monthbox');

// CALENDAR BOXES SETUP ------------------------------------------------------------------------------------------------
dayData.forEach(element => {
    element.dat = parseDate(element.dat);
    console.log("COLOR: " + element.color + " REACTION: " + element.reaction + " DATE: " + element.dat);
});

let offset = dayData[0].week;

dayIntervals = new Array;
let totalBoxes = offset + 1;
for(let i = 0; i < dayData.length-1; i++){
    dayIntervals.push(dayData[i].dat.dayDifference(dayData[i+1].dat));
    totalBoxes += dayData[i].dat.dayDifference(dayData[i+1].dat);
}

console.log("TOTAL BOXES: " + totalBoxes);

for(let i = 0; i < totalBoxes; i++){
    let divDaybox = document.createElement(`div`);
    divDaybox.classList.add('daybox');
    divDaybox.id = i + 1;
    monthbox.appendChild(divDaybox);
    delete divDaybox;
}




// let offset = parseInt(dayData[0].dat.getDate()) - dayData[0].week;
console.log(dayData[0].dat.getDate());
console.log(dayData[0].week);
console.log(offset);

// console.log(typeof(dayData[0].dat));

console.log(dayData[0].dat.getDate());

let dayBoxes = new Array;

for(let i = 1; i <= totalBoxes; i++){
    dayBoxes.push(document.getElementById(`${i}`))
}


let distanceTravelled = 0;
let intervalsTicked = 0;

console.log("OFFSET IS: " + offset);

for(let i = 0; i < dayData[0].dat.getDays() + offset; i++){

    if(i < offset){
        dayBoxes[i].style.outline = "0"
    }
    // dayBoxes[i].innerText = `${i}`;
    if(i == offset){
        dayBoxes[i].innerText = `${dayData[0].reaction}`;
        dayBoxes[i].style.backgroundColor = dayData[0].color;
        distanceTravelled = 0;
        intervalsTicked = 0;
    } 
    if(i > offset){
        distanceTravelled++;
        if(distanceTravelled == dayIntervals[intervalsTicked]){
            console.log(dayBoxes[i]);
            dayBoxes[i].innerText = `${dayData[intervalsTicked + 1].reaction}`;
            dayBoxes[i].style.backgroundColor = dayData[intervalsTicked + 1].color;
            distanceTravelled = 0;
            intervalsTicked++;
        }
    }

}