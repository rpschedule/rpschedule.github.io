
function dispTmLft (id) {
    const time = new Date(Date.now());
    const element = document.getElementById(id);
    let schedule;
    let ttnb;
    let block;

    schedule = [
        [7, 25, 0, "block 1 starts"],
        [7, 58, 0, "block 1 ends"],
        [8, 03, 0, "block 2 starts"],
        [8, 36, 0, "block 2 ends"],
        [8, 41, 0, "block 3 starts"],
        [9, 14, 0, "block 3 ends"],
        [9, 19, 0, "block 4 starts"],
        [9, 52, 0, "block 4 ends"],
        [9, 57, 0, "block 5 starts"],
        [10, 30, 0, "block 5 ends"],
        [10, 35, 0, "block 6 starts"],
        [11, 08, 0, "block 6 ends"],
        [11, 13, 0, "block 7 starts"],
        [11, 46, 0, "school ends"]
    ]

    if ( time.getHours() > schedule[schedule.length - 1][0] ) {
        return element.innerHTML = "<span id=\"time\">School ended</span>";
    } else if ( time.getHours() === schedule[schedule.length - 1][0] && time.getMinutes() >= schedule[schedule.length - 1][1] && time.getSeconds() > schedule[schedule.length - 1][2]) {
        return element.innerHTML = "<span id=\"time\">School ended</span>";        
    }

    for (block2 in schedule) {
        const blockTime = new Date( time.getFullYear(), time.getMonth(), time.getDate(), schedule[block2][0], schedule[block2][1], schedule[block2][2] );
        
        if (blockTime.getTime() - time.getTime() > 0) {
            ttnb = Math.floor(blockTime.getTime()/1000) - Math.floor(time.getTime()/1000)
            block = block2;
            break;
        }
    }

    let hour;
    let minute;
    let second;
    
    hour = Math.floor(ttnb/3600);
    ttnb = ttnb % 3600;
    minute = Math.floor(ttnb/60);
    second = ttnb % 60;

    if (second < 10) {
        second = `0${second}`;
    }
    if (minute < 10) {
        minute = `0${minute}`
    }

    let result = `<span id="time">${hour}:${minute}:${second}</span><br>until ${schedule[block][3]}`
    element.innerHTML = result;
}

window.onload = function () {
    dispTmLft("ttnbtext");
    setInterval(() => {
        dispTmLft("ttnbtext")
    }, 50)
}