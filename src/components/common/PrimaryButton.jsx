import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components';
import {dangerColors, primaryColors} from '../../constants/colors';

const ButtonWrap = styled.View`
  padding: 20px;
`;

const PrimaryBtn = styled.Button`
  border-radius: 20px;
  padding: 30px 30px;
`;

const PrimaryButton = ({title, onPress}) => {
  return (
    <ButtonWrap>
      <PrimaryBtn title={title} color={primaryColors.main} onPress={onPress} />
    </ButtonWrap>
  );
};

export default PrimaryButton;
