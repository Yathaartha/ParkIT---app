import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from '../../components/header/Header';
import Availability from '../../modules/home/Availability';
import ParkButton from '../../modules/home/ParkButton';
import CarParkingCanvas from '../../components/parking-lot/ParkingLot';
import {useDispatch} from 'react-redux';
import {getParkingDetailsAsync} from '../../components/parking-lot/parkingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [localData, setLocalData] = useState();
  const parkingAvailability = {
    total: 68,
  };

  useEffect(() => {
    dispatch(getParkingDetailsAsync());
  }, []);

  useEffect(() => {
    async function getLocalData() {
      const data = await AsyncStorage.getItem('booking');

      setLocalData(JSON.parse(data));
    }

    getLocalData();
  });

  useEffect(() => {
    if (localData?.entryTime) {
      navigation.navigate('PostParking');
    }
  }, [localData]);

  return (
    <ScrollView>
      <Header navigation={navigation} />
      <Availability
        available={parkingAvailability.available}
        total={parkingAvailability.total}
      />
      <ParkButton navigation={navigation} />
      <CarParkingCanvas showEntrance={false} showClosestParking={false} />
    </ScrollView>
  );
};

export default Home;
