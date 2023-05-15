import { Schedule } from './schedule.js' 

export default function Clock () {
}

function getNextBlock () {
    const now = new Date(Date.now);
    let nextSchoolDayIndex;
    for ( let i = 0; i < 365 && !nextSchoolDay; i++ ) {
        const compDate = new Date ( now.getTime() + 86400000 * i );
        if ( compDate.isSchoolDay() ) nextSchoolDay = compDate;
    }

}

/**
 * Whether or not it is a school day
 * @param {object} schedule - The schedule to 
 * @returns {boolean} 
 */
Date.prototype.isSchoolDay = (schedule) => {
    return !schedule.YEAR_SCHEDULE[this.getMonth()].offdays.includes(this.getDate());
}

/**
 * Whether or not it is a half day
 * @param {object} schedule - The schedule to 
 * @returns {boolean} 
 */
Date.prototype.isHalfDay = (schedule) => {
    return !schedule.YEAR_SCHEDULE[this.getMonth()].halfdays.includes(this.getDate());
}

/**
 * Returns which schedule to use based on the day of the week
 * 0 - Monday, Wednesday, Friday
 * 1 - Tuesday, Thursday
 * 2 - Halfday
 * null - Not a schoolday
 * @returns {number} schedule - 0-2 indicating which schedule to use
 */
Date.prototype.schedule = () => {
    if ( !this.isSchoolDay ) return null;
    if ( this.isHalfDay() ) return 2;
    if ( [2, 4, 6].includes(this.getDay()) ) return 0;
    if ( [3, 5].includes(this.getDay()) ) return 1;
    return null;
}