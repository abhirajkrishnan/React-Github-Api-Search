import React, { ReactElement } from 'react'
import { ResponsivePie } from "@nivo/pie";
import{dataset} from './dataset'

interface Props {
    data:any
}

export const Doughnut = ({ data  }:Props) => (
    <ResponsivePie
      data={data}
      margin={{ top: 30, right: 60, bottom: 80, left: 60 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeInnerRadiusOffset={8}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      colors={{ scheme: 'dark2' }}
      borderColor="#120d0d"
      enableArcLinkLabels={true}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsOffset={-8}
      arcLinkLabelsDiagonalLength={21}
      arcLabel={function(e){return `${e.value}`}}
      arcLinkLabelsStraightLength={8}
      arcLinkLabelsThickness={5}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="#ffffff"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        },
        {
          id: "squares-pattern",
          type: "patternSquares",
          size: 6,
          padding: 3,
          color: "rgba(255, 255, 255, 0.3)",
          stagger: false,
          background: "inherit",
        }
      ]}
      fill={[
        {
          match: {
            id: "JavaScript"
          },
          id: "lines"
        },
        {
          match: {
            id: "Python"
          },
          id: "dots"
        },
        {
          match: {
            id: "'CSS"
          },
          id: "dots"
        },
        {
          match: {
            id: "TypeScript"
          },
          id: "lines"
        },
        {
          match: {
            id: "PHP"
          },
          id: "lines"
        },
        {
          match: {
            id: "Go"
          },
          id: "dots"
        },
        {
          match: {
            id: "C"
          },
          id: "dots"
        },
        {
          match: {
            id: "HTML"
          },
          id: "squares-pattern"
        },
        {
          match: {
            id: "Ruby"
          },
          id: "lines"
        },
        {
          match: {
            id: "Rust"
          },
          id: "dots"
        }
      ]}
      motionConfig="wobbly"
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 46,
          itemsSpacing: 0,
          itemWidth: 60,
          itemHeight: 15,
          itemTextColor: "#999",
          itemDirection: "top-to-bottom",
          itemOpacity: 1,
          symbolSize: 12,
          symbolShape: "square",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000"
              }
            }
          ]
        }
      ]}
    />
  );
  