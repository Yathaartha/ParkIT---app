import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components';
import {dangerColors, primaryColors} from '../../constants/colors';

const ButtonWrap = styled.View`
  padding: 20px;
`;

const ParkBtn = styled.Button`
  border-radius: 20px;
  padding: 30px 30px;
`;

const ParkButton = ({available}) => {
  return (
    <ButtonWrap>
      <ParkBtn
        title="Park"
        color={available === 0 ? dangerColors.main : primaryColors.main}
      />
    </ButtonWrap>
  );
};

export default ParkButton;
