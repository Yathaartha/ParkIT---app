import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {dangerColors, primaryColors} from '../../constants/colors';

const ButtonWrap = styled.View`
  padding: 20px;
`;

const ParkBtn = styled.Button`
  border-radius: 20px;
  padding: 30px 30px;
`;

const ParkButton = ({navigation}) => {
  const {parking} = useSelector(state => state.park);

  return (
    <ButtonWrap>
      <ParkBtn
        title="Park"
        color={
          parking.availableSlots === 0 ? dangerColors.main : primaryColors.main
        }
        onPress={() => navigation.navigate('Parking')}
      />
    </ButtonWrap>
  );
};

export default ParkButton;
