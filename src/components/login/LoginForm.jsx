import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TextInput} from 'react-native';
import PrimaryButton from '../common/PrimaryButton';
import {colors} from '../../constants/colors';
import styled from 'styled-components';
import {loginAsync} from './loginSlice';
import {baseApi} from '../../api/api';
import ErrorText from '../common/ErrorText';

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
      {focus.includes('username') && username === '' ? (
        <ErrorText text={'Username is empty'} />
      ) : (
        ''
      )}
      <Input
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onEndEditing={() => setFocus([...focus, 'password'])}
        onChangeText={text => setPassword(text)}
      />
      {focus.includes('password') && password === '' ? (
        <ErrorText text="Password is empty" />
      ) : (
        ''
      )}
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
