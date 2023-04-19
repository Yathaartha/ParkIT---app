import React from 'react';
import styled from 'styled-components';
import {Image, Text} from 'react-native';
import {backgroundColors} from '../../constants/colors';
import logo from '../../assets/images/logo.png';
import helpIcon from '../../assets/icons/question.png';
import adminIcon from '../../assets/icons/setting.png';

const HeaderWrap = styled.View`
  background-color: ${backgroundColors.main};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 120px;
  align-items: center;
`;

const Icon = styled.Image`
  width: 30px;
`;

const Logo = styled.Image`
  width: 100px;
`;

const Header = () => {
  return (
    <HeaderWrap>
      <Icon source={helpIcon} resizeMode="contain" />
      <Logo source={logo} resizeMode="contain" />
      <Icon source={adminIcon} resizeMode="contain" />
    </HeaderWrap>
  );
};

export default Header;
