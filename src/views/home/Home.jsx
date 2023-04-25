import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from '../../components/header/Header';
import Availability from '../../modules/home/Availability';
import ParkButton from '../../modules/home/ParkButton';
import CarParkingCanvas from '../../components/parking-lot/ParkingLot';

const Home = ({navigation}) => {
  const parkingAvailability = {
    available: 15,
    total: 30,
  };

  return (
    <ScrollView>
      <Header navigation={navigation} />
      <Availability
        available={parkingAvailability.available}
        total={parkingAvailability.total}
      />
      <ParkButton available={parkingAvailability.available} />
      <CarParkingCanvas />
    </ScrollView>
  );
};

export default Home;
