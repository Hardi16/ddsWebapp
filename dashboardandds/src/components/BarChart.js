import React from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart=(props)=>{
    let state=props.state
    let text=props.text
    return(
        <Bar
        data={state}  
        options={{
          title:{
            display:true,
            fontSize:20
          },
          legend:{
            display:true,
            position:'top'
          }
        }}
      />
    )
}

export default BarChart;