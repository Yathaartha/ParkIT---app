import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/header/Header';
import Availability from '../components/modules/home/Availability';
import ParkButton from '../components/modules/home/ParkButton';

const Home = () => {
  const parkingAvailability = {
    available: 2,
    total: 30,
  };

  return (
    <View>
      <Header />
      <Availability
        available={parkingAvailability.available}
        total={parkingAvailability.total}
      />
      <ParkButton available={parkingAvailability.available} />
    </View>
  );
};

export default Home;
