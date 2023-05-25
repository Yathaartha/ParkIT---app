import React, {useState} from 'react';
import {View, StyleSheet, Button, Modal, Text, TextInput} from 'react-native';
import {primaryColors} from '../../constants/colors';
import ErrorText from '../common/ErrorText';
import {useDispatch, useSelector} from 'react-redux';
import {searchAsync} from './findSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FindBookingForm = ({visible, closeModal, navigation}) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [focus, setFocus] = useState([]);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {findResponse} = useSelector(state => state.find);

  const handleSubmit = async () => {
    const response = await dispatch(searchAsync({vehicleNumber}));

    if (response.payload?.parkingSlot) {
      await AsyncStorage.setItem(
        'booking',
        JSON.stringify(response.payload?.parkingSlot),
      );
      navigation.navigate('PostParking');
    } else {
      setError('No booking found');
    }
    console.log('Find booking form submitted', response.payload);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Enter your vehicle number (case sensitive):</Text>
          <TextInput
            placeholder="BA-2343"
            value={vehicleNumber}
            onEndEditing={() => setFocus([...focus, 'vehicleNumber'])}
            onChangeText={text => setVehicleNumber(text)}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginVertical: 10,
            }}
          />
          {focus.includes('vehicleNumber') && vehicleNumber === '' ? (
            <ErrorText text={'Please enter vehicle number'} />
          ) : null}
          <ErrorText text={error} />
          <View
            style={{
              gap: 5,
            }}>
            <Button
              title="Find"
              onPress={handleSubmit}
              color={primaryColors.main}
            />
            <Button
              title="Cancel"
              onPress={closeModal}
              color={primaryColors.main}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default FindBookingForm;
