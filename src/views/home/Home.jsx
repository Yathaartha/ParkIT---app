import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import Header from '../../components/header/Header';
import Availability from '../../modules/home/Availability';
import ParkButton from '../../modules/home/ParkButton';
import CarParkingCanvas from '../../components/parking-lot/ParkingLot';
import {useDispatch} from 'react-redux';
import {getParkingDetailsAsync} from '../../components/parking-lot/parkingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FindBookingForm from '../../components/FindBookingForm/FindBookingForm';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [localData, setLocalData] = useState();
  const parkingAvailability = {
    total: 68,
  };
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          flex: 1,
        }}
        onPress={openModal}>
        <Text
          style={{
            textAlign: 'center',
          }}>
          Already have a booking? Press here
        </Text>
      </TouchableOpacity>
      <CarParkingCanvas showEntrance={false} showClosestParking={false} />
      <FindBookingForm
        visible={modalVisible}
        closeModal={closeModal}
        navigation={navigation}
      />
    </ScrollView>
  );
};

export default Home;
