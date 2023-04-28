import { Schedule } from './schedule.js' 

export default function Clock () {
    const time = new Date( Date.now() );

    for ( let i = 0; i < 365; i++ ) {
        const compare = new Date(time.getFullYear(), time.getMonth(), time.getDate() + i, time.getMinutes(), time.getSeconds(), time.getMilliseconds());
        if ( daysOffDateObjects( Schedule.YEAR_SCHEDULE ).filter(date => date.getTime() > time.getTime())[0].getDate() !== time.getDate() && !(time.getDay() === 0 || time.getDay === 6)) {
            
        }
    }
}

// todo: memoize
/**
 * Returns an array with a list of dates that school is off from the provided schedule
 */
function daysOffDateObjects ( yearSchedule ) {
    let out = [];
    const time = new Date( Date.now() )

    for ( const month in yearSchedule ) {
        for ( const dayIndex in yearSchedule[month].offdays ) {
            if ( month >= time.getMonth && yearSchedule[month].offdays[dayIndex] >= time.getDay() ) {
                out.push(new Date( time.getFullYear(), month, yearSchedule[month].offdays[dayIndex]));
            } else {
                out.push(new Date( time.getFullYear() + 1, month, yearSchedule[month].offdays[dayIndex]));
            } 
        }
    }

    return out;
}