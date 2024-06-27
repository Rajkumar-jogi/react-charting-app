import "react-loader-spinner/dist/loader/css/react-spinner-loader.css" 

import {
    LineChart, 
    Line, 
    ResponsiveContainer, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend,
    Brush,
} from 'recharts'

import { useCallback, useEffect, useState } from 'react'

import {format} from 'date-fns'

import {toJpeg} from 'html-to-image';

import Loader from 'react-loader-spinner';



import { aggregateDaily, aggregateWeekly, aggregateMonthly } from '../../utils/dataAggregationFunctions'

import "./index.css"

const filterConstants = 
    {
        DAILY: 'Daily',
        WEEKLY: 'Weekly',
        MONTHLY: 'Monthly'
    }


const Charts = ({selectedTimeFrame}) => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false);

    // to get the data point from data.json file
    const getDataFromLocal = async () => {
        setLoading(true)
        try{
            // fetching the data from public folder
            const response = await fetch('data.json')
            const fetchedData = await response.json()
            if(!response.ok){
                throw new Error('Failed to fetch data from local...')
            }
            else{
               const formatedData = fetchedData.map(item => ({
                ...item,
                timestamp: format(new Date(item.timestamp), 'yyyy-MM-dd')
               }))
               setData(formatedData)
            }
            
        }catch(e){
            console.log(e)
        }finally {

            // Simulate delay of 500 milli seconds
            setTimeout( () => setLoading(false), 500)
        }
    }

    // to get the filterd data 
    const filterData = useCallback(() => {
        switch(selectedTimeFrame){
            case filterConstants.DAILY:
                return aggregateDaily(data)
            case filterConstants.WEEKLY:
                return aggregateWeekly(data)
            case filterConstants.MONTHLY:
                return aggregateMonthly(data)
            default:
                return data
        }
    }, [selectedTimeFrame, data])
    
    useEffect(() => {
        getDataFromLocal()
    }, [])

    useEffect(() => {
        filterData()
    }, [selectedTimeFrame, filterData]) 

    const aggregatedData = filterData()


    // providing fun to export chart into png/jpg
    const handleExportChart = () => {
        const chartNode = document.getElementById('chart-container');
        if (chartNode) {
            toJpeg(chartNode)
                .then(function (dataUrl) {
                    const link = document.createElement('a');
                    link.download = 'chart.jpg';
                    link.href = dataUrl;
                    link.click();
                })
                .catch(function (error) {
                    console.error('Export Error:', error);
                });
        }
    };


    return (
        <div className='charts-container'>
            <h3>{selectedTimeFrame ? `${selectedTimeFrame} based chart` : 'Not selected the TimeFrame Breakdown'}</h3>
            {loading ? (
                <div className="loader-container">
                    <Loader type='TailSpin' color="#0390fc" height={80} width={80} />
                </div>
            ) : (
                selectedTimeFrame && (
                    <>
                        <ResponsiveContainer width='100%' height={400}>
                            <LineChart id="chart-container" data={aggregatedData}>
                                <CartesianGrid strokeDasharray="5 5" />
                                <XAxis dataKey='timestamp' />
                                <YAxis />
                                <Tooltip />
                                <Legend dataKey='value'/>
                                <Line type="monotone" dataKey='value' stroke="#fc03b6" activeDot={{ r: 8 }} />
                                <Brush dataKey='timestamp' height={30} />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="export-text">You can export chart as jpg image</p>
                        <button className="export-chat-btn" onClick={handleExportChart}>Export Chart</button>
                    </>
                )
            )}
        </div>
    );
    
}

export default Charts