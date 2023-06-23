import React, { useState, useContext, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import './techradar.css';
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const TechRadarChart = ({ etiquettes }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    //console.log(etiquettes);
    let tmp = [];
    etiquettes.forEach(etiquette => {
      etiquette.subject.forEach(suj => {
        tmp.push({
          subject: suj, A: 50
        })
      })

    })

    const compteurSujets = {};
    for (const element of tmp) {
      const sujet = element.subject;
      if (compteurSujets[sujet]) {
        compteurSujets[sujet]++;
      } else {
        compteurSujets[sujet] = 1;
      }
    }
    console.log("compteurSujets ", compteurSujets);
    let tmp2 = [];


    for (const clé in compteurSujets) {
      if (compteurSujets.hasOwnProperty(clé)) {
        const valeur = compteurSujets[clé];
        tmp2.push({ subject: clé, A: valeur * 150 / tmp.length });
      }
    }

    setData(tmp2);
  }, [etiquettes])
  console.log("DATAS=", data)
  return (
    data.length > 0 ?
      <RadarChart cx={300} cy={250} outerRadius={150} width={800} height={800} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
      :
      <div className="spinner-container">
        <CircularProgress />
      </div>
  );
};

export default TechRadarChart;
