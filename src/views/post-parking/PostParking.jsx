import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, Alert} from 'react-native';
import ParkTimer from '../../components/post-parking/ParkTimer';
import ParkingDetails from '../../components/post-parking/ParkingDetails';
import PrimaryButton from '../../components/common/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {exitParkingSlotAsync} from '../../components/post-parking/exitSlice';
import ParkingLotWithRoute from '../../components/post-parking/ParkingLotWithRoute';
import moment from 'moment';
import RestaurantRecommendations from '../../components/restaurant-recommendations/RestaurantRecommendations';

const PostParking = ({navigation}) => {
  const [localData, setLocalData] = useState({});
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    async function getLocalData() {
      const data = await AsyncStorage.getItem('booking');

      setLocalData(JSON.parse(data));
    }

    getLocalData();
  });

  const handleExit = async () => {
    if (localData.entryTime) {
      dispatch(exitParkingSlotAsync({vehicleNumber: localData.vehicleNumber}));

      await AsyncStorage.setItem('booking', JSON.stringify({}));

      navigation.navigate('Home');
    }
  };

  const createnAlert = () => {
    const entryTime = moment(localData.entryTime);
    const exitTime = moment();

    const timeDiff = exitTime.diff(entryTime);
    const hours = moment.duration(timeDiff).asHours();
    const amount = Math.max(hours * 0.5, 0.25);
    Alert.alert(
      'Are you sure you want to exit?',
      `Your total amount is ${amount.toFixed(2)}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => handleExit()},
      ],
    );
  };

  return (
    <ScrollView>
      <ParkTimer />
      <ParkingDetails />
      <ParkingLotWithRoute showEntrance={true} showClosestParking={true} />
      <PrimaryButton title="Nearby Restaurants" onPress={openModal} />
      <PrimaryButton
        title="End Parking Session"
        onPress={() => createnAlert()}
      />
      <RestaurantRecommendations
        visible={modalVisible}
        closeModal={closeModal}
      />
    </ScrollView>
  );
};

export default PostParking;
