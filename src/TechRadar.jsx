import React, { useState, useContext, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import VeilleTuyauContext from './VeilleTuyauContext';

/*
const data = [
  { subject: 'Tech A', A: 120, B: 110 },
  { subject: 'Tech B', A: 98,  B: 130 },
  { subject: 'Tech C', A: 86,  B: 130 },
  { subject: 'Tech D', A: 99,  B: 100 },
  { subject: 'Tech E', A: 85,  B: 91 },
  { subject: 'Tech F', A: 115, B: 115 },
  { subject: 'Tech G', A: 91,  B: 110 },
  { subject: 'Tech H', A: 90,  B: 123 },
  { subject: 'Tech I', A: 100, B: 105 },
  { subject: 'Tech J', A: 85,  B: 90 }
];
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


    console.log(tmp2)
    setData(tmp2);
  }, [etiquettes])

  return (
    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar name="A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />

    </RadarChart>
  );
};

export default TechRadarChart;
