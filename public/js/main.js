let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const pointer = document.getElementById('pointer');
const chart = document.getElementById('chart');

const lineVertical = document.getElementById('lineVertical');
const lineHorizontal = document.getElementById('lineHorizontal');

const colorpreview = document.getElementById('colorpreview');

const reactionpreview = document.getElementById('reactionpreview');
const reactionpreviewBase = reactionpreview.innerText + ' ';

console.log(reactionpreview);

let isMouseDown = false;
let isMouseInside = false;

let today = new Date;

const mainform = document.getElementById('mainform');
const formtx = document.getElementById('formtx');
const formty = document.getElementById('formty');
const formcolor = document.getElementById('formcolor');
const formdate = document.getElementById('formdate');
const formreaction = document.getElementById('formreaction');
const formweek = document.getElementById('formweek');


console.log(today.getDate());
console.log(today.getMonth());
console.log(today.getFullYear());


const Reactions = {
    amazing: 'a',
    great: 'vg',
    good: 'g',
    alright: 'alr',
    meh: 'm',
    bad: 'b',
    awful: 'vb',
    fucked: 'fucked'
}

console.log(pointer);
console.log(chart);

const getT = (parent, child) => {
    // console.log(parent.getBoundingClientRect().x + " " + parent.getBoundingClientRect().y);
    // console.log(child.getBoundingClientRect().x + " " + child.getBoundingClientRect().y);
    // console.log("TX: " + (child.getBoundingClientRect().x - parent.getBoundingClientRect().x + child.clientWidth/2)/parent.clientWidth + " TY: " + (child.getBoundingClientRect().y - parent.getBoundingClientRect().y + child.clientHeight/2)/parent.clientHeight);

    let TObj = new Object();

    TObj.tx = (child.getBoundingClientRect().x - parent.getBoundingClientRect().x + child.clientWidth/2)/parent.clientWidth;

    TObj.ty = (child.getBoundingClientRect().y - parent.getBoundingClientRect().y + child.clientHeight/2)/parent.clientHeight

    if(TObj.tx >= 1) TObj.tx = 0.99;
    if(TObj.ty >= 1) TObj.ty = 0.99;

    console.log("TX: " + TObj.tx + " TY: " + TObj.ty + " OFFSET: " + document.documentElement.scrollTop);

    return TObj;

}

let lastTValue = getT(chart, pointer);

const pointerMove = e => {
    // console.log(e.pageX);
    // console.log(e.pageY);
    // console.log(chart.getBoundingClientRect().x);

    if(isMouseDown && isMouseInside){
        pointer.style.left = e.pageX - chart.getBoundingClientRect().x - pointer.clientWidth/2 + "px";
        pointer.style.top = e.pageY - chart.getBoundingClientRect().y - pointer.clientHeight/2 - document.documentElement.scrollTop + "px";

        lastTValue = getT(chart, pointer);

        console.log(getScalePixel().data);

        colorpreview.style.backgroundColor = `#${getScalePixel().data[0].toString(16).padStart(2, '0')}${getScalePixel().data[1].toString(16).padStart(2, '0')}${getScalePixel().data[2].toString(16).padStart(2, '0')}`;

        console.log(`#${getScalePixel().data[0].toString(16).padStart(2, '0')}${getScalePixel().data[1].toString(16).padStart(2, '0')}${getScalePixel().data[2].toString(16).padStart(2, '0')}`);

    }
}


const pointerAdjust = () => {
    pointer.style.left = (chart.clientWidth * lastTValue.tx) - pointer.clientWidth/2 + "px";
    pointer.style.top = (chart.clientHeight * lastTValue.ty) - pointer.clientHeight/2 + "px";
}

const previewAdjust = () => {

    if(lastTValue.ty <= 0.06) reactionpreview.innerText = reactionpreviewBase + Reactions.amazing;
    if(lastTValue.ty > 0.06 && lastTValue.ty < 0.20) reactionpreview.innerText = reactionpreviewBase + Reactions.great;
    if(lastTValue.ty > 0.17 && lastTValue.ty <= 0.32) reactionpreview.innerText = reactionpreviewBase + Reactions.good;
    if(lastTValue.ty > 0.32 && lastTValue.ty <= 0.41) reactionpreview.innerText = reactionpreviewBase + Reactions.alright;
    if(lastTValue.ty > 0.41 && lastTValue.ty <= 0.60) reactionpreview.innerText = reactionpreviewBase + Reactions.meh;
    if(lastTValue.ty > 0.60 && lastTValue.ty <= 0.73) reactionpreview.innerText = reactionpreviewBase + Reactions.bad;
    if(lastTValue.ty > 0.73 && lastTValue.ty <= 0.88) reactionpreview.innerText = reactionpreviewBase + Reactions.awful;
    if(lastTValue.ty > 0.88) reactionpreview.innerText = reactionpreviewBase + Reactions.fucked;
    
    pointer.innerText = reactionpreview.innerText.replace(reactionpreviewBase, '');

    formreaction.value = reactionpreview.innerText.replace(reactionpreviewBase, '');
    formcolor.value = colorpreview.style.backgroundColor;

    formdate.value = today.getFullYear() + '-' + (today.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2}) + '-' + today.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2});
    
    formtx.value = lastTValue.tx.toPrecision(2);
    formty.value = lastTValue.ty.toPrecision(2);

    if(today.getDay() != 0) formweek.value = today.getDay() - 1;
    if(today.getDay() == 0) formweek.value = 6;

    console.log(formdate.value);

}

if(canSubmit){
    window.addEventListener('mousemove', e => {
        // console.log(isMouseInside);
        pointerMove(e);
        previewAdjust();
    })
}


chart.addEventListener('mousedown', e => {
    isMouseDown = true;
});

chart.addEventListener('mouseup', e => {
    isMouseDown = false;
});

chart.addEventListener('mouseenter', e => {
    isMouseInside = true;
})

chart.addEventListener('mouseleave', e => {
    isMouseInside = false;
})

window.addEventListener('resize', e => {
    lineVertical.style.fontSize = chart.clientHeight / 24 + "px";
    lineHorizontal.style.fontSize = chart.clientWidth / 24 + "px";

    console.log(lastTValue.tx);

    pointerAdjust();

})
// ------------------------------------------------------------------------------------------------------------

window.onload = function () {
    // GET THE IMAGE.
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = 'https://i.imgur.com/b1LHkvg.png';

    // WAIT TILL IMAGE IS LOADED.
    img.onload = function () {
        fill_canvas(img);       // FILL THE CANVAS WITH THE IMAGE.
    }

}

const fill_canvas = img => {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);       // DRAW THE IMAGE TO THE CANVAS.

    let testdata = ctx.getImageData(1,1,1,1).data;
    console.log(testdata);    
}

const getScalePixel = () => {
    return ctx.getImageData(canvas.width * lastTValue.tx, canvas.height * lastTValue.ty, 1, 1);
}
