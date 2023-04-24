import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from '../components/header/Header';
import Availability from '../components/modules/home/Availability';
import ParkButton from '../components/modules/home/ParkButton';
import CarParkingCanvas from '../components/parking-lot/ParkingLot';

const Home = () => {
  const parkingAvailability = {
    available: 2,
    total: 30,
  };

  return (
    <ScrollView>
      <Header />
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
