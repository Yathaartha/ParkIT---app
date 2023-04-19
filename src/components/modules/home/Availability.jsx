import React from 'react';
import styled from 'styled-components';
import DonutChart from '../../donut-chart/DonutChart';
import {Text} from 'react-native';
import {colors} from '../../../constants/colors';

const AvailabilityWrap = styled.View`
  margin: 20px auto;
  position: relative;
  flex: 1;
`;

const AvailabilityText = styled.Text`
  position: absolute;
  left: 11%;
  top: 35%;
  font-size: 36px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ExtraInformation = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  margin-bottom: 25px;
  text-align: center;
`;

const Availability = ({available, total}) => {
  return (
    <>
      <AvailabilityWrap>
        <DonutChart
          numerator={available}
          denominator={total}
          radius={80}
          strokeWidth={15}
        />
        <AvailabilityText>
          {available}/{total}
        </AvailabilityText>
      </AvailabilityWrap>
      <ExtraInformation>
        {available === 0
          ? 'Parking spaces all booked!'
          : 'Parking spaces available now!'}
      </ExtraInformation>
    </>
  );
};

export default Availability;
