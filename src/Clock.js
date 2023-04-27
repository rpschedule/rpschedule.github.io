import { Schedule } from './schedule.js' 

export default function Clock () {
    const time = new Date( Date.now() );

    const nextBlock = [1, 3, 5].includes(time.getDay()) ? new Date( time.getFullYear(), time.getMonth(), time.getDay(), Schedule.MON_WED_FRI)

    
}