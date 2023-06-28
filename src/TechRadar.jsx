import React, { useState,  useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,Legend } from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { generateDataCategory,generateData } from './utils/subjectsUtils';
import './techradar.css';
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const TechRadarChart = ({ etiquettes,selectedYear,drawchoice }) => {
  const [data, setData] = useState([])
  console.log('Drawchoice='+drawchoice)
  useEffect(() => {
    setData(drawchoice==="categories"?generateDataCategory(etiquettes,selectedYear):generateData(etiquettes,selectedYear));
  }, [etiquettes,selectedYear,drawchoice])



  console.log("DATAS=", data)
  return (
    data.length > 0 ?
      <RadarChart cx={300} cy={350} outerRadius={300} width={700} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
      :
      <div className="spinner-container">
        <CircularProgress />
      </div>
  );
};

export default TechRadarChart;
