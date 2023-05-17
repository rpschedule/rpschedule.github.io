import { Schedule } from './schedule.js' 

export default function Clock ({showWeeks, showMilliseconds}) {
    const nextBlock = getNextBlock();
    let ttnb = nextBlock.getTime() - Date.now();

    // convert to weeks, days, hours, minutes, and seconds (possibly milliseconds too) then display to user
    if (showWeeks) {
        const weeks = Math.floor(ttnb/604800000)
        ttnb -= weeks * 604800000;
    }

    const days = Math.floor(ttnb/86400000);
    ttnb -= days * 86400000;

    const hours = Math.floor(ttnb/3600000);
    ttnb -= hours * 3600000;

    const minutes = Math.floor(ttnb/60000);
    ttnb -= minutes * 60000;

    console.log(Math.floor(ttnb/1000))

    const seconds = Math.floor(ttnb/1000);
    ttnb -= seconds * 1000;

    // at this point, ttnb is the number of milliseconds

    return <p></p>
}

// make this also return the index of the block so Clock knows what event is next
function getNextBlock () {
    const now = new Date(Date.now());
    const schedule = getSchedule(now) === 0 ? Schedule.MON_WED_FRI : 
        getSchedule(now) === 1 ? Schedule.TUES_THUR :
        getSchedule(now) === 2 ? Schedule.HALF_DAY : null; 
    let nextSchoolDay;

    let lastDayWasSchoolDay = false;
    for ( let i = 0; i < 365 && !nextSchoolDay; i++ ) {
        const compDate = new Date ( now.getTime() + 86400000 * i );
        const lastBlock = new Date(compDate.getFullYear(), compDate.getMonth(), compDate.getDate(), schedule[schedule.length - 1][0], schedule[schedule.length - 1][1], schedule[schedule.length - 1][2]);

        if ( isSchoolDay(compDate) && (compDate.getTime() <= lastBlock.getTime() || lastDayWasSchoolDay) ) nextSchoolDay = new Date(compDate);
        if ( isSchoolDay(compDate)) lastDayWasSchoolDay = true;
    }

    let blocks = []

    for (let i in schedule) {
        const hours = schedule[i][0];
        const minutes = schedule[i][1];
        const seconds = schedule[i][2];

        // new Date(year, monthIndex, day, hours, minutes, seconds)
        blocks.push(new Date(
            nextSchoolDay.getFullYear(), 
            nextSchoolDay.getMonth(), 
            nextSchoolDay.getDate(), 
            hours, 
            minutes, 
            seconds
        ));
    }

    return blocks.filter(date => date.getTime() > now.getTime())[0];
}

/**
 * Whether or not it is a school day
 * @param {object} schedule - The schedule to use
 * @param {date} date - The date to use
 * @returns {boolean} 
 */
function isSchoolDay (date) {
    return !Schedule.YEAR_SCHEDULE[date.getMonth()].offdays.includes(date.getDate());
}

/**
 * Whether or not it is a half day
 * @param {object} schedule - The schedule to use
 * @param {date} date - The date to use
 * @returns {boolean} 
 */
function isHalfDay (date) {
    return Schedule.YEAR_SCHEDULE[date.getMonth()].halfdays.includes(date.getDate());
}

/**
 * Returns which schedule to use based on the day of the week
 * 0 - Monday, Wednesday, Friday
 * 1 - Tuesday, Thursday
 * 2 - Halfday
 * null - Not a schoolday
 * @param {date} date - The date to use
 * @returns {number} schedule - 0-2 indicating which schedule to use
 */
function getSchedule (date) {
    if ( !isSchoolDay(date) ) return null;
    if ( isHalfDay(date) ) return 2;
    if ( [1, 3, 5].includes(date.getDay()) ) return 0;
    if ( [2, 4].includes(date.getDay()) ) return 1;
    return null;

    
}