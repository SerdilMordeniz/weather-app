import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { Forecast } from "../__generated__/types";
import CustomTooltip from '../component/CustomTooltip'

/**
 * Responsible for rendering the multi line chart with the customized tooltip
 */
export default function MultiLineChart({ dataForecast }: {dataForecast: [Forecast];}) {
    const [days, setDays] = useState <string []> ([]);
    const [min, setMin] = useState <number[]> ([]);
    const [max, setMax] = useState <number[]> ([]);
    const [description, setDescription] = useState <string[]> ([]);
    const [data, setData] = useState([{}]);

    useEffect(() => {
        const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        let days: string[] = [];
        let descriptions: string[] | any = []
        let firstDay : number = 0;
        let minTemps: number[] | any = [];
        let maxTemps: number[] | any = [];
        if (dataForecast[0].timestamp) {
            const milliseconds = dataForecast[0].timestamp*1000;
            //number between 0 to 6 representing the weekdays
            firstDay = (new Date(milliseconds).getDay());
        }
            for (let i = 0; i <= 7; i++) {
                days.push(weekday[(firstDay+i)%7]);
                if(dataForecast[i].min && dataForecast[i].max && dataForecast[i].description) {
                    minTemps.push(dataForecast[i].min);
                    maxTemps.push(dataForecast[i].max);
                    descriptions.push(dataForecast[i].description);
                }
        }
        setDays(days);
        setMin(minTemps);
        setMax(maxTemps);
        setDescription(descriptions);
    }, [dataForecast]);

    useEffect(() => {
        if(days && min && max) {
            const data = []
            for(let i = 0; i < days.length; i++) {
                data.push({name: days[i].toString(), "Maximum Temperature": max[i], "Minimum Temperature": min[i], description: description[i].toString()})
            }
            setData(data);
        }
    }, [days, min, max])

    if(data.length > 0) {
        return (
            <ResponsiveContainer width="90%" height="80%">
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="°C" />
                <Tooltip content={<CustomTooltip />} />
                <Line type="linear" dataKey="Maximum Temperature" stroke="red"  />
                <Line type="linear" dataKey="Minimum Temperature" stroke="blue" />
            </LineChart>
            </ResponsiveContainer>
        );
    } else {
        return (
            <div>Data is loading...</div>
        )
    }
}
