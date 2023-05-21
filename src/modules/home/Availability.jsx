import React from 'react';
import styled from 'styled-components';
import DonutChart from '../../components/donut-chart/DonutChart';
import {Text} from 'react-native';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';

const AvailabilityWrap = styled.View`
  margin: 20px auto;
  position: relative;
  flex: 1;
`;

const AvailabilityText = styled.Text`
  position: absolute;
  ${props => (props.isTwoDigit ? 'left: 9%' : 'left: 11%')};
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

const Availability = ({total}) => {
  const {parking} = useSelector(state => state.park);

  return (
    <>
      <AvailabilityWrap>
        <DonutChart
          numerator={parking.availableSlots}
          denominator={total}
          radius={80}
          strokeWidth={15}
        />
        <AvailabilityText
          isTwoDigit={parking.availableSlots > 9 ? true : false}>
          {parking.availableSlots}/{total}
        </AvailabilityText>
      </AvailabilityWrap>
      <ExtraInformation>
        {parking.availableSlots === 0
          ? 'Parking spaces all booked!'
          : 'Parking spaces available now!'}
      </ExtraInformation>
    </>
  );
};

export default Availability;
