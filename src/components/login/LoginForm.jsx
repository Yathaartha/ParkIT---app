import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput} from 'react-native';
import PrimaryButton from '../common/PrimaryButton';
import {colors} from '../../constants/colors';
import styled from 'styled-components';
import {loginAsync} from './loginSlice';
import {baseApi} from '../../api/api';

const Input = styled.TextInput`
  border-width: 1px;
  border-radius: 10px;
  padding: 10px 15px;
`;

const FormWrap = styled.View`
  padding: 0 20px;
  justify-content: center;
  height: 100%;
`;

const LoginForm = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState([]);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const loginState = useSelector(state => state.login);

  const handleSubmit = async () => {
    try {
      dispatch(loginAsync({username, password}));

      if (loginState.response.data) {
        navigation.navigate('AdminDashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrap>
      <Text>Login Form</Text>
      <Input
        placeholder="Username"
        value={username}
        onEndEditing={() => setFocus([...focus, 'username'])}
        onChangeText={text => setUsername(text)}
      />
      <Text>
        {focus.includes('username') && username === '' ? 'error' : ''}
      </Text>
      <Input
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onEndEditing={() => setFocus([...focus, 'password'])}
        onChangeText={text => setPassword(text)}
      />
      <Text>
        {focus.includes('password') && password === '' ? 'error' : ''}
      </Text>
      <Text>{loginState.response.data ? 'success' : 'invalid'}</Text>
      <PrimaryButton
        title="Login"
        onPress={() => {
          handleSubmit();
        }}
      />
    </FormWrap>
  );
};

export default LoginForm;
