import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data1 = {
  labels: ['Paid', 'Parcial', 'Unpaid'],
  datasets: [
    {
      label: 'Quotes',
      data: [12, 19, 3],
      backgroundColor: [
        '#E47424',
				'#8B949E',
        '#30363D'
      ],
			borderWidth: 0
    },
  ],
};
export const data2 = {
  labels: ['Paid', 'Parcial', 'Unpaid'],
  datasets: [
    {
      label: 'Quotes',
      data: [12, 19, 3],
      backgroundColor: [
        '#E47424',
				'#8B949E',
        '#30363D'
      ],
			borderWidth: 0
    },
  ],
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' ,
    }
  },
};
const PieChart = () => {
  return (
    <>
    	<Box
				mt={'2vh'}
        display={'flex'}
				flexDir={'column'}
        placeContent={'center'}>
			<Text textColor={'web.text2'} fontFamily={'body'} fontWeight={'normal'} mb={'2vh'}>Quotes Satus</Text>
			<Box maxH={'35vh'} display={'flex'} mt={'1vh'}>
      <Pie
        data={data1}
				options={options}
        />
			<Pie
				data={data2}
				options={options}/>
    	</Box>
			</Box>
    </>)
    
}

export default PieChart