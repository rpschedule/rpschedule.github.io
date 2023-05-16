import { Schedule } from './schedule.js' 

export default function Clock () {
    alert(getNextBlock())

    return <p> wassup gents </p>
}

function getNextBlock () {
    const now = new Date(Date.now());
    let nextSchoolDay;

    for ( let i = 0; i < 365 && !nextSchoolDay; i++ ) {
        const compDate = new Date ( now.getTime() + 86400000 * i );
        if ( isSchoolDay(compDate) ) nextSchoolDay = new Date(compDate);
    }

    let blocks = []
    let schedule = getSchedule(now) === 1 ? Schedule.MON_WED_FRI : 
        getSchedule(now) === 2 ? Schedule.TUES_THUR :
        getSchedule(now) === 3 ? Schedule.HALF_DAY : null; 

    for (let i in schedule) {
        const hours = schedule[i][0];
        const minutes = schedule[i][1];
        const seconds = schedule[i][2];

        // new Date(year, monthIndex, day, hours, minutes, seconds)
        blocks.push(new Date(
            nextSchoolDay.getFullYear(), 
            nextSchoolDay.getMonth(), 
            nextSchoolDay.getDay(), 
            hours, 
            minutes, 
            seconds
        ));
    }

    blocks = blocks.filter(date => date.getTime() > now.getTime())

    return blocks;
}

/**
 * Whether or not it is a school day
 * @param {object} schedule - The schedule to use
 * @param {date} date - The date to use
 * @returns {boolean} 
 */
function isSchoolDay (schedule, date) {
    return !schedule.YEAR_SCHEDULE[date.getMonth()].offdays.includes(date.getDate());
}

/**
 * Whether or not it is a half day
 * @param {object} schedule - The schedule to use
 * @param {date} date - The date to use
 * @returns {boolean} 
 */
function isHalfDay (schedule, date) {
    return !schedule.YEAR_SCHEDULE[date.getMonth()].halfdays.includes(date.getDate());
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
    if ( [2, 4, 6].includes(date.getDay()) ) return 0;
    if ( [3, 5].includes(date.getDay()) ) return 1;
    return null;
}