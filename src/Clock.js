import { Schedule } from './schedule.js'
import './Clock.css'

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Clock({ showWeeks, showTenthSeconds }) {
    const [time, setTime] = useState(new Date());
    const [schedule, setSchedule] = useState( // error: on days like sunday, this will be null. it needs to be updated/created somewhere in getNextBlock()
        getSchedule(time) === 0 ? Schedule.MON_WED_FRI :
            getSchedule(time) === 1 ? Schedule.TUES_THUR :
                getSchedule(time) === 2 ? Schedule.HALF_DAY : undefined
    )

    axios.get('https://raw.githubusercontent.com/rpschedule/pastebin/main/alt_schedule.json')
        .then(response => {
            if (response.data.alt_schedule) {
                setSchedule(response.data.schedule)
            }
        })
        .catch(error => {
            console.log(error.message)
        });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const [nextBlock, event] = getNextBlock(time, schedule);
    let ttnb = nextBlock.getTime() - time.getTime();

    // convert to weeks, days, hours, minutes, and seconds (possibly milliseconds too) then display to user
    let weeks;
    if (showWeeks) {
        weeks = Math.floor(ttnb / 604800000)
        ttnb -= weeks * 604800000;
    }

    const days = Math.floor(ttnb / 86400000);
    ttnb -= days * 86400000;

    const hours = Math.floor(ttnb / 3600000);
    ttnb -= hours * 3600000;

    const minutes = Math.floor(ttnb / 60000);
    ttnb -= minutes * 60000;

    const seconds = Math.floor(ttnb / 1000);
    ttnb -= seconds * 1000;

    // at this point, ttnb is the number of milliseconds

    let result;

    if (showWeeks && weeks !== 0) {
        result = `${weeks}:${days}:${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}${showTenthSeconds ? '.' + Math.floor(ttnb/100) : ''}`;
    } else {
        if (days !== 0) {
            result = `${days}:${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}${showTenthSeconds ? '.' + Math.floor(ttnb/100) : ''}`;
        } else {
            if (hours !== 0) {
                result = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}${showTenthSeconds ? '.' + Math.floor(ttnb/100) : ''}`;
            } else {
                result = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}${showTenthSeconds ? '.' + Math.floor(ttnb/100) : ''}`;
            }
        }
    }

    return (
        <div className='ClockContainer'>
            <h2 className='ClockTime'>{result}</h2>
            <h3 className='ClockEvent'>Until {event}</h3>
        </div>
    )
}

function getNextBlock(now, schedule) {
    let nextSchoolDay;

    let lastDayWasSchoolDay = false;
    for (let i = 0; i < 365 && !nextSchoolDay; i++) {
        const compDate = new Date(now.getTime() + 86400000 * i);
        
        if (isSchoolDay(compDate)) {
            let compSchedule = (
                getSchedule(compDate) === 0 ? Schedule.MON_WED_FRI :
                getSchedule(compDate) === 1 ? Schedule.TUES_THUR :
                getSchedule(compDate) === 2 ? Schedule.HALF_DAY : undefined
            )

            if ( i === 0 && schedule) compSchedule = schedule; 
            
            const lastBlock = new Date(compDate.getFullYear(), compDate.getMonth(), compDate.getDate(), compSchedule[compSchedule.length - 1][0], compSchedule[compSchedule.length - 1][1], compSchedule[compSchedule.length - 1][2]);
            
            if (isSchoolDay(compDate) && (compDate.getTime() <= lastBlock.getTime() || lastDayWasSchoolDay)) nextSchoolDay = new Date(compDate);
            if (isSchoolDay(compDate)) lastDayWasSchoolDay = true;
        }
    }

    let blocks = []
    let nextSchedule = 
        getSchedule(nextSchoolDay) === 0 ? Schedule.MON_WED_FRI :
            getSchedule(nextSchoolDay) === 1 ? Schedule.TUES_THUR :
                getSchedule(nextSchoolDay) === 2 ? Schedule.HALF_DAY : undefined

    for (let i in nextSchedule) {
        const hours = nextSchedule[i][0];
        const minutes = nextSchedule[i][1];
        const seconds = nextSchedule[i][2];

        // new Date(year, monthIndex, day, hours, minutes, seconds)
        blocks.push({
            date: new Date(
                nextSchoolDay.getFullYear(),
                nextSchoolDay.getMonth(),
                nextSchoolDay.getDate(),
                hours,
                minutes,
                seconds
            ),
            event: nextSchedule[i][3],
        });
    }

    const futureBlocks = blocks.filter(entry => entry.date.getTime() > now.getTime());

    return [futureBlocks[0].date, futureBlocks[0].event];
}

/**
 * Whether or not it is a school day
 * @param {date} date - The date to use
 * @returns {boolean} 
 */
function isSchoolDay(date) {
    return !(Schedule.YEAR_SCHEDULE[date.getMonth()].offdays.includes(date.getDate()) || [0, 6].includes(date.getDay()));
}

/**
 * Whether or not it is a half day
 * @param {date} date - The date to use
 * @returns {boolean} 
 */
function isHalfDay(date) {
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
function getSchedule(date) {
    if (!isSchoolDay(date)) return null;
    if (isHalfDay(date)) return 2;
    if ([1, 3, 5].includes(date.getDay())) return 0;
    if ([2, 4].includes(date.getDay())) return 1;
    return null;
}