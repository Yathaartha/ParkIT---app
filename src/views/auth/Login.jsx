import React from 'react';
import {View, Text} from 'react-native';
import LoginForm from '../../components/login/LoginForm';

const Login = ({navigation}) => {
  return (
    <View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

export default Login;
