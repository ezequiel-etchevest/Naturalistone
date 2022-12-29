import React from "react";
import {  
	Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Box, Text } from '@chakra-ui/react'

ChartJS.register(
	CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)
const labels = ['Monday', 'Tuesday','Wenesday', 'Thursday','Friday'];
const data = {
  labels,
  datasets: [
    {
      label: 'Sales',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 50000 })),
      backgroundColor: '#E47424',
    }
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


const BarChart = () => {


  return (
    <>
		<Box
			display={'flex'}
			maxW={'32vw'}
			p={'2vh'}
			placeContent={'center'}
			flexDir={'column'}>
		<Text textColor={'web.text2'} fontFamily={'body'} fontWeight={'normal'} mb={'2vh'}>Daily Sales</Text>
    <Bar
			data={data}
			options={options}
      />
		</Box>
    </>
    )
}

export default BarChart