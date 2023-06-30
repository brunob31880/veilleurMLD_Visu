import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { generateDataCategory, generateData } from './utils/subjectsUtils';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import './techradar.css';
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const TechRadarChart = ({ etiquettes, daterange, datachoice, drawchoice }) => {
  const [data, setData] = useState([])
  console.log('datachoice=' + datachoice)
  useEffect(() => {
    setData(datachoice === "categories" ? generateDataCategory(etiquettes, daterange) : generateData(etiquettes, daterange));
  }, [etiquettes, daterange, datachoice, drawchoice])

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };


  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
  const formattedDateRange = `${formatDate(daterange[0])}-${formatDate(daterange[1])}`;


  const getView = () => {
    if (drawchoice === "radarchart") {
      return (
        <RadarChart width={700} height={500} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="text" />
          <PolarRadiusAxis />
          <Radar name={datachoice === "categories" ? "categories " + formattedDateRange : "sujets " + formattedDateRange} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      )
    }
    else if (drawchoice === "wordcloud") {
      return <ReactWordcloud options={options} words={data} size={[700, 500]} />
    }
  }

  console.log("DATAS=", data)
  console.log("DrawChoice=" + drawchoice)
  return (
    data.length > 0 ?
      getView()
      :
      <div className="spinner-container">
        <CircularProgress />
      </div>
  );
};

export default TechRadarChart;
