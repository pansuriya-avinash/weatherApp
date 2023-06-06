import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chart.js/auto';
import { Scale } from 'chart.js/dist';

const Chart = (props: any) => {
	const options = {
		scales: {
			y: {
				beginAtZero: true,
				suggestedMax: 40 // Customize the maximum value on the y-axis if needed
			}
		}
	};
	const data = {
		labels: props.forecastData.map((ele: any) => moment(ele.dt_txt).format(' MMMM DD YYYY')),
		datasets: [
			{
				label: 'MaxTemperature (°C)',
				data: props.forecastData.map((ele: any) => ele.main.temp_max - 273.15),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)'
			},
			{
				label: 'MinTemperature (°C)',
				data: props.forecastData.map((ele: any) => ele.main.temp_min - 273.15),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)'
			}
		]
	};

	return (
		<div className='chart-wrapper'>
			<Line options={options} data={data} />
		</div>
	);
};

export default Chart;
