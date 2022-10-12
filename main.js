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
    [16, 27, 0, "school ends"]
]

/**** Tu & Thu bell schedule
// 1st block - 7:25  - 8:19
// 2nd block - 8:24  - 9:18
// 3rd block - 9:23  - 10:17
// 4th block - 10:22 - 11:16
// 5th block - 11:21 - 12:47
// Lunch A   - 11:21 - 11:41
// Lunch B   - 11:42 - 12:03
// Lunch C   - 12:04 - 12:25
// Lunch D   - 12:26 - 12:47
// 6th block - 12:52 - 13:46
// 7th block - 13:51 - 14:45
*/

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

/**** Mon, Wed, & Fri bell schedule
// 1st block - 7:25  - 8:14
// 2nd block - 8:19  - 9:08
// 3rd block - 9:13  - 10:02
// Advisory  - 10:07 - 10:32
// 4th block - 10:37 - 11:26
// 5th block - 11:31 - 12:57
// Lunch A   - 11:31 - 11:51
// Lunch B   - 11:52 - 12:13
// Lunch C   - 12:14 - 12:35
// Lunch D   - 12:36 - 12:57
// 6th block - 13:02 - 13:51
// 7th block - 13:56 - 14:45
*/

function dispTmLft (id) {
    const time = new Date(Date.now());
    const element = document.getElementById(id);
    let schedule;
    let ttnb;
    let block;

    if ( time.getDay() === 1 || time.getDay() === 3 || time.getDay() === 5 ) {
        schedule = monWedFri;
    } else if ( time.getDay() === 2 || time.getDay() === 4 ) {
        schedule = tueThu;
    } else {
        element.innerHTML = "<span id=\"time\">No school today</span>";
    }

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