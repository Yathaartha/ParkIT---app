import React, {useEffect} from 'react';
import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import CarParkingCanvas from '../../components/parking-lot/ParkingLot';
import {useDispatch} from 'react-redux';
import {getNearestSlotAsync} from '../../components/parking-lot/parkingSlice';
import ParkingForm from '../../components/parking/ParkingForm';

const Parking = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNearestSlotAsync());
  });

  return (
    <KeyboardAvoidingView behavior="height" style={{height: '100%'}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <ParkingForm navigation={navigation} />
        <CarParkingCanvas
          showEntrance={true}
          showClosestParking={true}
          closestSlot={{laneNumber: 2, slotNumber: 17}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Parking;
