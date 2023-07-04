import React, { useState, useEffect } from 'react';
import { getMostRepresentativeFields, generateTimeCategoryData, generateTimeData } from '../utils/subjectsUtils';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';




/**
 * 
 * @param {*} param0 
 * @returns 
 */
const TemporalChart = ({ etiquettes, daterange, datachoice, drawchoice }) => {
    const [data, setData] = useState([])
    const [ms, setMS] = useState([])

    useEffect(() => {
        setData(datachoice === "categories" ? generateTimeCategoryData(etiquettes, daterange) : generateTimeData(etiquettes, daterange));
    }, [etiquettes, daterange, datachoice, drawchoice])

    useEffect(() => {
        console.log("Data=", data);
        let representative = getMostRepresentativeFields(data, 2)
        if (representative && representative.length === 2) {
            let one = representative[0];
            let two = representative[1];
            console.log("One=", one[0]);
            setMS([one[0], two[0]])
        }
    }, [data])

    return (
        <>
            {ms && ms.length === 2 &&
                <AreaChart width={1000} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey={ms[0]} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey={ms[1]} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            }
        </>
    )
}

export default TemporalChart;
