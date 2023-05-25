import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
  TextInput,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {colors, primaryColors} from '../../constants/colors';
import PrimaryButton from '../common/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {bookParkingSlotAsync} from './bookingSlice';
import ErrorText from '../common/ErrorText';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Input = styled.TextInput`
  border-width: 1px;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: ${colors.white};
`;

const FormWrap = styled.View`
  padding: 0 20px;
  justify-content: center;
  /* height: 100%; */
  margin-bottom: 10px;
`;

const FormTitle = styled.Text`
  padding: 10px 0;
  font-size: 20px;
`;

const InputLabel = styled.Text`
  padding: 10px 0;
  font-size: 16px;
`;

const FormHeader = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

const SubmitButton = styled.Button`
  width: 100px;
`;

const ParkingForm = ({navigation}) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [focus, setFocus] = useState([]);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async needCover => {
    if ((error === '') & (vehicleNumber !== '') && estimatedHours !== '') {
      try {
        const response = await dispatch(
          bookParkingSlotAsync({vehicleNumber, estimatedHours, needCover}),
        );

        if (response.error) {
          console.log(response.error);
        } else {
          console.log(response.payload);
          await AsyncStorage.setItem(
            'booking',
            JSON.stringify(response.payload),
          );
          navigation.navigate('PostParking');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Please fill in the form correctly');
    }
  };

  const createAlert = () => {
    Alert.alert(
      'Would you like your vehicle to be covered?',
      `Extra charges may apply.`,
      [
        {
          text: 'No',
          onPress: () => handleSubmit(false),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => handleSubmit(true)},
      ],
      {
        cancelable: true,
      },
    );
  };

  useEffect(() => {
    if (focus.includes('vehicleNumber') && vehicleNumber === '') {
      setError('Vehicle number is empty');
    } else if (focus.includes('estimatedHours') && estimatedHours === '') {
      setError('Estimated hours is empty');
    } else {
      setError('');
    }
  }, [vehicleNumber, focus, estimatedHours]);

  return (
    <FormWrap>
      <FormHeader>
        <FormTitle>Parking Form</FormTitle>
        <SubmitButton
          title="Submit"
          color={primaryColors.main}
          onPress={() => createAlert()}
        />
      </FormHeader>
      <ErrorText text={error} />
      <InputLabel>Vehicle Number</InputLabel>
      <Input
        placeholder="eg: 4A5-1234"
        value={vehicleNumber}
        maxLength={8}
        onEndEditing={() => setFocus([...focus, 'vehicleNumber'])}
        onChangeText={text => setVehicleNumber(text)}
      />
      <InputLabel>Estimated Parking Duration (in hours)</InputLabel>
      <Input
        placeholder="eg: 2 hours"
        value={estimatedHours}
        keyboardType="numeric"
        onEndEditing={() => setFocus([...focus, 'estimatedHours'])}
        onChangeText={text => setEstimatedHours(text)}
      />
    </FormWrap>
  );
};

export default ParkingForm;
