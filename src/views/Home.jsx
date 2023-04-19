import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/header/Header';
import DonutChart from '../components/donut-chart/DonutChart';

const Home = () => {
  return (
    <View>
      <Header />
      <Text>Home Page</Text>
      <DonutChart
        numerator={20}
        denominator={30}
        radius={80}
        strokeWidth={15}
      />
    </View>
  );
};

export default Home;
