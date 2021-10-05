import React, { ReactElement } from 'react'
import { ResponsiveBar } from "@nivo/bar"
import {poprepo} from '../types'

interface Props {
  data:poprepo[]
}

function StackedBar({data}:Props): ReactElement {
    return (
        <ResponsiveBar
          data={data}
          keys={["stars"]}
          indexBy="reponame"
          margin={{ top: 30, right: 80, bottom: 80, left: 60 }}
          padding={0.4}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: 'category10' }}
          colorBy="indexValue"
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 10,
            legend: "Repos",
            legendOffset: 45,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 10,
            legend: "Stars",
            
            legendPosition: "middle",
            legendOffset: -50
          }}
          enableGridX={true}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#fafafa"
       
        />
      );
      
}

export default StackedBar
