let lunch = parseInt(localStorage.getItem("lunch")) || 0;

function setLunch (index) {
    lunch = index;
    localStorage.setItem("lunch", index);

    updateLunchSel();
    dispTmLft("ttnbtext")
}

function updateLunchSel () {
    document.getElementById("A")?.classList[lunch === 0 ? "add" : "remove"]("selected");
    document.getElementById("B")?.classList[lunch === 1 ? "add" : "remove"]("selected");
    document.getElementById("C")?.classList[lunch === 2 ? "add" : "remove"]("selected");
}

function update (txt, id) {
    const element = document.getElementById(id);

    if ( txt === element.innerHTML) {
        return;
    }

    // trusted invokers, no sanitization
    element.innerHTML = txt;
}

function dispTmLft (id) {
    const time = new Date(Date.now());
    const year = time.getFullYear();
    const month = time.getMonth(); // 0 - 11
    const day = time.getDate(); // 1 - 31
    const weekday = time.getDay(); // 0 - 6
    const hours = time.getHours(); // 0 - 23
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const specialSchedule = SCHEDULE.exceptions?.[year]?.[month + 1]?.[day];
    
    // return early if there's no school
    if (
        specialSchedule === "" ||
        weekday === 0 ||
        weekday === 6
    ) return update("<span id=\"time\">No school today</span>", id); 

    const schedule = SCHEDULE[specialSchedule || SCHEDULE.weekly[weekday]];

    // Check if school is over
    if ( hours > schedule[schedule.length - 1][1][0] || (
        hours === schedule[schedule.length - 1][1][0] && minutes >= schedule[schedule.length - 1][1][1])
    ) return update("<span id=\"time\">School ended</span>", id);

    for (const block of schedule) {
        let isStart;

        if ((block[0][0] > hours) ||
            (block[0][0] === hours && block[0][1] > minutes)
        ) isStart = true;
        else if ((block[1][0] > hours) ||
            (block[1][0] === hours && block[1][1] > minutes)
        ) isStart = false;
        else continue;

        const isLunch = !!block[3]?.[0];
        let nextEvent;

        if (isLunch) {
            const lunchTimes = block[3][lunch];

            if (lunchTimes[0][0] > hours ||
                (lunchTimes[0][0] === hours && lunchTimes[0][1] > minutes)
            ) {
                nextEvent = lunchTimes;
                isStart = true;
            } else if (lunchTimes[1][0] > hours ||
                (lunchTimes[1][0] === hours && lunchTimes[1][1] > minutes)
            ) {
                // if the next event is the end of lunch and the end of the period,
                // prioritize the end of the period.
                if (lunch === 2) nextEvent = block;
                else nextEvent = lunchTimes;
                isStart = false;
            } else {
                nextEvent = block;
            }
        } else {
            nextEvent = block;
        }

        const totalSecondsLeft = ((nextEvent[isStart ? 0 : 1][0] - hours) * 60 + nextEvent[isStart ? 0 : 1][1] - minutes) * 60 - seconds;
        const secondsLeft = totalSecondsLeft % 60;
        const minutesLeft = Math.floor((totalSecondsLeft / 60) % 60);
        const hoursLeft = Math.floor(totalSecondsLeft / 3600);

        const hoursMinutesString = hoursLeft > 0 ? `${hoursLeft}:${minutesLeft.toString().padStart(2, '0')}` : minutesLeft;
        const paddedSeconds = secondsLeft.toString().padStart(2, '0');
        const beginsEndsString = nextEvent[3] !== true ? (isStart ? " begins" : " ends") : (isStart ? " begin" : " end");

        update(`<span id="time">${hoursMinutesString}:${paddedSeconds}</span><br>until ${nextEvent[2]}${beginsEndsString}`, id);

        break;
    }
}

window.onload = function () {
    updateLunchSel();
    dispTmLft("ttnbtext");
    setInterval(() => {
        dispTmLft("ttnbtext")
    }, 50)
}

const SCHEDULE = {
    monTueFri: [
        [[7,25],[8,15],"block 1"],
        [[8,20],[9,10],"block 2"],
        [[9,15],[10,5],"block 3"],
        [[10,10],[11,2],"block 4"],
        [[11,7],[12,30],"block 5",[
            [[11,7],[11,31],"lunch A"],
            [[11,35],[11,59],"lunch B"],
            [[12,6],[12,30],"lunch C"]]
        ],
        [[12,35],[13,25],"block 6"],
        [[13,30],[14,20],"block 7"]
    ],
    wedThu: [
        [[7,25],[8,12],"block 1"],
        [[8,17],[9,4],"block 2"],
        [[9,9],[9,56],"block 3"],
        [[10,1],[10,48],"block 4"],
        [[10,53],[11,18],"advisory"],
        [[11,23], [12,36], "block 5",[
            [[11,23],[11,47],"lunch A"],
            [[11,48],[12,12],"lunch B"],
            [[12,12],[12,36],"lunch C"]]
        ],
        [[12,41],[13,28],"block 6"],
        [[13,33],[14,20],"block 7"]
    ],
    earlyRelease:[
        [[7,25],[7,51],"block 1"],
        [[7,56],[8,22],"block 2"],
        [[8,27],[8,53],"block 3"],
        [[8,58],[9,26],"block 4"],
        [[9,31],[9,57],"block 5"],
        [[10,2],[10,28],"block 6"],
        [[10,33],[11,0],"block 7"]
    ],
    ami:[
        [[7,0],"Collaboration and Lesson Design (teachers)"],
        [[8,0],"Assignments must be posted (teachers)"],
        // true at the end here means the S in begins/ends should be ommitted
        [[8,30],"block 1 office hours",true],
        [[9,0],"block 2 office hours",true],
        [[9,30],"block 3 office hours",true],
        [[10,0],"block 4 office hours",true],
        [[10,30],"block 5 office hours",true],
        [[11,0],"block 6 office hours",true],
        [[11,30],"block 7 office hours",true],
        [[12,0],"Academic Support"]
    ],
    assembly:[
        [[7,25],[8,12],"block 1"],
        [[8,17],[9,4],"block 2"],
        [[9,9],[9,56],"block 3"],
        [[10,1],[10,50],"block 4"],
        [[10,55],[12,8],"block 5",[
            [10,55],[[11,18],"lunch A"],
            [[11,20],[11,43],"lunch B"],
            [[11,45],[12,8],"lunch C"]]
        ],
        // this must be wrong but it's what the calendar says
        [[12,8],[12,52],"block 6"],
        [[12,57],[1,40],"block 7"],
        [[13,45],[14,20],"the assembly"]
    ],
    delayedStart:[
        [[9,25],[9,56],"block 1"],
        [[10,1],[10,32],"block 2"],
        [[10,37],[11,10],"block 3"],
        [[11,15],[12,29],"block 4",[
            [[11,15],[11,39],"lunch A"],
            [[11,41],[12,5],"lunch B"],
            [[12,7],[12,32],"lunch C"]]
        ],
        // this has to be wrong but it's again what the calendar says
        [[12,27],[13,8],"block 5"],
        [[13,13],[13,44],"block 6"],
        [[13,49],[14,20],"block 7"]
    ],
    sept10th2025:[
        [[7, 25],[8,45],"advisory"],
        [[8,50][9,26],"block 1"],
        [[9,31][10,7],"block 2"],
        [[10,12][10,48],"block 3"],
        [[10,53][11,29],"block 4"],
        [[11,34][12,48],"block 5",[
            [[11,34],[11,58],"lunch A"],
            [[11,59],[12,23],"lunch B"],
            [[12,24],[12,48],"lunch C"],
        ]],
        [[12,53][1,34],"block 6"],
        [[1,39][2,20],"block 7"],
    ],
    weekly: [
        "",
        "monTueFri",
        "monTueFri",
        "wedThu",
        "wedThu",
        "monTueFri",
        "",
    ],
    exceptions: {
        2025: {
            9: {
                1: "",
                10: "sept10th2025",
                12: "earlyRelease",
                26: "earlyRelease"
            },
            10: {
                10: "",
                30: "earlyRelease",
                31: ""
            },
            11: {
                24: "",
                25: "",
                26: "",
                27: "",
                28: "",
            },
            12: {
                19: "earlyRelease",
                22: "",
                23: "",
                24: "",
                25: "",
                26: "",
                29: "",
                30: "",
                31: "",
            }
        },
        2026: {
            1: {
                1: "",
                2: "",
                5: "",
                19: "",
                30: "earlyRelease",
            },
            2: {
                12: "earlyRelease",
                13: "",
                16: "",
            },
            3: {
                13: "",
                30: "",
                31: "",
            },
            4: {
                1: "",
                2: "",
                3: "",
                24: "earlyRelease",
            },
            5: {
                20: "earlyRelease",
            }
        }
    },
    start: [25, 8, 19],
    end: [21, 5, 20]
};
