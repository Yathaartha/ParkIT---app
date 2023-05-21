import React, {useState} from 'react';
import styled from 'styled-components';
import {
  TextInput,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import {colors, primaryColors} from '../../constants/colors';
import PrimaryButton from '../common/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {bookParkingSlotAsync} from './bookingSlice';

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
  const {booking} = useSelector(state => state.book);

  const handleSubmit = () => {
    try {
      dispatch(bookParkingSlotAsync({vehicleNumber, estimatedHours}));

      navigation.navigate('PostParking');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrap>
      <FormHeader>
        <FormTitle>Parking Form</FormTitle>
        <SubmitButton
          title="Submit"
          color={primaryColors.main}
          onPress={() => handleSubmit()}
        />
      </FormHeader>
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
