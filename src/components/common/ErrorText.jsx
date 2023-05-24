import React from 'react';
import {dangerColors} from '../../constants/colors';
import {Text} from 'react-native';

const ErrorText = ({text}) => {
  return (
    <Text style={{color: dangerColors.main, paddingBottom: 5}}>{text}</Text>
  );
};

export default ErrorText;
