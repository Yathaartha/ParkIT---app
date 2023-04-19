import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {dangerColors, primaryColors} from '../../constants/colors';

const DonutChart = ({numerator, denominator, radius, strokeWidth}) => {
  const percentage = numerator / denominator;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference * percentage} ${circumference}`;

  return (
    <View>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
          stroke={numerator === 0 ? dangerColors.main : primaryColors.main}
          fill="transparent"
        />
        <Path
          d={`M ${radius}, ${strokeWidth / 2} a ${radius - strokeWidth / 2}, ${
            radius - strokeWidth / 2
          } 0 1 1 0, ${2 * (radius - strokeWidth / 2)} a ${
            radius - strokeWidth / 2
          }, ${radius - strokeWidth / 2} 0 1 1 0, -${
            2 * (radius - strokeWidth / 2)
          }`}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          stroke={numerator === 0 ? dangerColors.main : primaryColors.fade}
          fill="transparent"
        />
      </Svg>
    </View>
  );
};

export default DonutChart;
