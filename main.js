const yearSchedule = [
    {
        "halfdays": [],
        "offdays": [2, 3, 4, 16, 30]
    },
    {
        "halfdays": [],
        "offdays": [13, 20, 21]
    },
    {
        "halfdays": [],
        "offdays": [6]
    },
    {
        "halfdays": [],
        "offdays": [3, 4, 5, 6, 7, 10]
    },
    {
        "halfdays": [23],
        "offdays": [1]
    },
    {
        "halfdays": [],
        "offdays": []
    },
    {
        "halfdays": [],
        "offdays": []
    },
    {
        "halfdays": [],
        "offdays": []
    },
    {
        "halfdays": [],
        "offdays": [5, 19]
    },
    {
        "halfdays": [27],
        "offdays": [3, 17, 28, 31]
    },
    {
        "halfdays": [],
        "offdays": [1, 23, 24, 25, 28]
    },
    {
        "halfdays": [],
        "offdays": [22, 23, 26, 27, 28, 29, 30]
    },
];

const halfDay = [
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

const tueThu = [
    [7, 25, 0, "block 1 starts"],
    [8, 19, 0, "block 1 ends"],
    [8, 24, 0, "block 2 starts"],
    [9, 18, 0, "block 2 ends"],
    [9, 23, 0, "block 3 starts"],
    [10, 17, 0, "block 3 ends"],
    [10, 22, 0, "block 4 starts"],
    [11, 16, 0, "block 4 ends"],
    [11, 21, 0, "block 5 starts"],
    [11, 21, 0, "lunch A starts"],
    [11, 41, 0, "lunch A ends"],
    [11, 42, 0, "lunch B starts"],
    [12, 03, 0, "lunch B ends"],
    [12, 04, 0, "lunch C starts"],
    [12, 25, 0, "lunch C ends"],
    [12, 26, 0, "lunch D starts"],
    [12, 47, 0, "block 5 ends"],
    [12, 52, 0, "block 6 starts"],
    [13, 46, 0, "block 6 ends"],
    [13, 51, 0, "block 7 starts"],
    [14, 45, 0, "school ends"]
]

const monWedFri = [
    [7, 25, 0, "block 1 starts"],
    [8, 14, 0, "block 1 ends"],
    [8, 19, 0, "block 2 starts"],
    [9, 08, 0, "block 2 ends"],
    [9, 13, 0, "block 3 starts"],
    [10, 02, 0, "block 3 ends"],
    [10, 07, 0, "advisory starts"],
    [10, 32, 0, "advisory ends"],
    [10, 37, 0, "block 4 starts"],
    [11, 26, 0, "block 4 ends"],
    [11, 31, 0, "block 5 / lunch A starts"],
    [11, 51, 0, "lunch A ends"],
    [11, 52, 0, "lunch B starts"],
    [12, 13, 0, "lunch B ends"],
    [12, 14, 0, "lunch C starts"],
    [12, 35, 0, "lunch C ends"],
    [12, 36, 0, "lunch D starts"],
    [12, 57, 0, "block 5 / lunch D ends"],
    [13, 02, 0, "block 6 starts"],
    [13, 51, 0, "block 6 ends"],
    [13, 56, 0, "block 7 starts"],
    [14, 45, 0, "school ends"]
]

function update (txt, id) {
    const element = document.getElementById(id);

    if ( txt === element.innerHTML) {
        return;
    }
    
    element.innerHTML = txt;
}

function dispTmLft (id) {
    const element = document.getElementById(id);
    const time = new Date(Date.now());
    let isHalfDay = false;
    let schedule;
    let block;
    let ttnb;

    // Check if it is a half day or a day off
    if (yearSchedule[time.getMonth()].offdays.includes(time.getDate())) {
        return update("<span id=\"time\">No school today</span>", id)
    }

    if (yearSchedule[time.getMonth()].halfdays.includes(time.getDate())) {
        isHalfDay = true;
        schedule = halfDay;
    }

    if (!isHalfDay) { // Choose schedule to use on normal days
        if ( // Monday / Wednesday / Friday
                time.getDay() === 1 ||
                time.getDay() === 3 ||
                time.getDay() === 5 
            ) {
            schedule = monWedFri;
        } 
        else if ( // Tuesday / Thursday 
                time.getDay() === 2 || 
                time.getDay() === 4 
            ) {
            schedule = tueThu;
        } 
        else {
            return update("<span id=\"time\">No school today</span>", id);
        }
    }

    // Check if school is over
    if ( time.getHours() > schedule[schedule.length - 1][0] ) { // Quick check via the hour
        return update("<span id=\"time\">School ended</span>", id);
    } else if ( // Check via minutes and seconds 
            time.getHours() === schedule[schedule.length - 1][0] && 
            time.getMinutes() >= schedule[schedule.length - 1][1] && 
            time.getSeconds() > schedule[schedule.length - 1][2]
        ) {
        return update("<span id=\"time\">School ended</span>", id);        
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

    update(`<span id="time">${hour}:${minute}:${second}</span><br>until ${schedule[block][3]}`, id);
}

window.onload = function () {
    dispTmLft("ttnbtext");
    setInterval(() => {
        dispTmLft("ttnbtext")
    }, 50)
}
