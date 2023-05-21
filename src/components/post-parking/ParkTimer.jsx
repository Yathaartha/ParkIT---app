import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {primaryColors} from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ParkTimer = () => {
  const [time, setTime] = useState(0);

  const [isRunning, setIsRunning] = useState(true);

  const [details, setDetails] = useState({});

  useEffect(() => {
    async function getData() {
      const a = await AsyncStorage.getItem('booking');

      setDetails(JSON.parse(a));
    }

    getData();
  }, []);

  useEffect(() => {
    if (details.entryTime) {
      const entryTime = new Date(details.entryTime);
      const currentTime = new Date();
      const diff = currentTime - entryTime;
      setTime(diff / 1000);
    }
  }, [details]);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / (60 * 60));

  // Minutes calculation
  const minutes = Math.floor((time % 3600) / 60);

  // Seconds calculation
  const seconds = Math.floor(time % 60);

  // Milliseconds calculation
  // const milliseconds = time % 100;

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {hours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timer: {
    textAlign: 'center',
    color: primaryColors.main,
    fontSize: 80,
  },
});

export default ParkTimer;
