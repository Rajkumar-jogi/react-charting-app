const fs = require('fs')
const {formatISO, addDays} = require('date-fns')


// generate random integers 
const generateRandomInt = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// generete the random data with timestamp and value
const generateData = () => {
    const startDate = new Date('2023-01-01T00:00:00Z');
    const data = []

    for(let i = 0; i < 100; i++){
        const currentDate = addDays(startDate, i);
        data.push({
            timestamp: formatISO(currentDate),
            value: generateRandomInt(5, 20)
        })

    }
    return data
}

const data = generateData()
console.log('total data points: ', data.length)
// data to inserted into data.json file
fs.writeFileSync('./public/data.json', JSON.stringify(data, null, 4))
console.log('data is added in data.json file successfully...')