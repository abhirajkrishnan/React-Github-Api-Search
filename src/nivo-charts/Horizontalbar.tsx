import React, { ReactElement } from 'react'
import { ResponsiveBar } from "@nivo/bar"
import { Forkrepo} from '../types'

interface Props {
  datas:Forkrepo[]
}


function HorizontalBar({datas}:Props): ReactElement {
    return (

        <ResponsiveBar
        data={datas}
        keys={["fork"]}
        indexBy="reponame"
        margin={{ top: 40, right: 30, bottom: 80, left: 110 }}
        padding={0.1}
        layout="horizontal"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: 'dark2' }}
        colorBy="indexValue"
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 10,
          legend: "Forks",
          legendOffset: 45,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 0,
          tickRotation: 40,
          legend: "Repos",
          
          legendPosition: "middle",
          legendOffset: -90
        }}
        enableGridX={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#fafafa"
        motionConfig={{ mass: 347, tension: 253, friction: 201, clamp: false, precision: 0.01, velocity: 0 }}
      />
      );
      
}

export default HorizontalBar
