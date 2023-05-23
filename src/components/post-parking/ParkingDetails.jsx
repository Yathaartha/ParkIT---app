import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ParkingDetails = () => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function getData() {
      const a = await AsyncStorage.getItem('booking');

      setDetails(JSON.parse(a));
    }

    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        Vehicle Number: {details.vehicleNumber ? details.vehicleNumber : '-'}
      </Text>
      <Text>Lane Number: {details.laneNumber ? details.laneNumber : '-'}</Text>
      <Text>Slot Number: {details.slotNumber ? details.slotNumber : '-'}</Text>
      <Text>
        Start Time:{' '}
        {details.entryTime
          ? moment(details.entryTime).format('DD/MM hh:mm A')
          : '-'}{' '}
      </Text>
      <Text>
        Estimated time:{' '}
        {details.estimatedExitTime
          ? moment(details.estimatedExitTime).format('DD/MM hh:mm A')
          : '-'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ParkingDetails;
