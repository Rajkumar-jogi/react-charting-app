import {format,  parseISO, startOfMonth, startOfWeek } from "date-fns";

export const aggregateDaily = (data) => data ;

export const aggregateWeekly = (data) => {
    let result = []
    const map = new Map()

    data.forEach(item => {
        const weekStart = format(startOfWeek(parseISO(item.timestamp)), 'yyyy-MM-dd')
        if(!map.has(weekStart)){
            map.set(weekStart, {timestamp: weekStart, value: 0, count: 0})
        }
        const aggregated = map.get(weekStart)
        aggregated.value += item.value
        aggregated.count += 1
    });

    map.forEach((value, key) => {
        result.push({timestamp: key, value: value.value / value.count})
    })
    
    // console.log('Weekly Aggregated Data:', result);
    return result
}

export const aggregateMonthly = (data) => {
    let result = []
    const map = new Map()

    data.forEach(item => {
        const monthStart = format(startOfMonth(parseISO(item.timestamp)), 'yyyy-MM-dd')
        if(!map.has(monthStart)){
            map.set(monthStart, {timestamp: monthStart, value: 0, count: 0})
        }
        const aggregated = map.get(monthStart)
        aggregated.value += item.value 
        aggregated.count += 1
    })

    map.forEach((value, key) => {
        result.push({timestamp: key, value: value.value / value.count})
    })

    // console.log('Monthly Aggregated Data:', result);

    return result
}