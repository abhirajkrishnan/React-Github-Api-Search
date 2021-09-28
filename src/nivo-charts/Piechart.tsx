import React, { ReactElement } from 'react'
import { ResponsivePie } from "@nivo/pie";
import{dataset} from './dataset'

interface Props {
    data:any
}

export const Piechart = ({ data  }:Props) => (
    <ResponsivePie
      data={data}
      margin={{ top: 30, right: 60, bottom: 60, left: 60 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeInnerRadiusOffset={8}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      colors={{ scheme: 'set1' }}
      borderColor="#120d0d"
      enableArcLinkLabels={true}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsOffset={-8}
      arcLinkLabelsDiagonalLength={21}
      arcLinkLabelsStraightLength={8}
      arcLinkLabelsThickness={5}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
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
        }
      ]}
      fill={[
        {
          match: {
            id: "ruby"
          },
          id: "lines"
        },
        {
          match: {
            id: "c"
          },
          id: "lines"
        },
        {
          match: {
            id: "go"
          },
          id: "lines"
        },
        {
          match: {
            id: "python"
          },
          id: "lines"
        },
        {
          match: {
            id: "scala"
          },
          id: "lines"
        },
        {
          match: {
            id: "lisp"
          },
          id: "lines"
        },
        {
          match: {
            id: "sass"
          },
          id: "lines"
        },
        {
          match: {
            id: "javascript"
          },
          id: "lines"
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
          symbolSize: 8,
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
  