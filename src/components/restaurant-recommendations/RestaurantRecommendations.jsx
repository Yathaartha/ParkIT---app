import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Image,
  StyleSheet,
  Modal,
  Button,
  ScrollView,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import PrimaryButton from '../common/PrimaryButton';

const RestaurantRecommendations = ({visible, closeModal}) => {
  const [restaurants, setRestaurants] = useState([]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getNearbyRestaurants = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=AIzaSyBigRK0shsKFAkq6mmfdtUhSMqZ3SDTH-w`,
      );
      setRestaurants(response.data.results);
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
    }
  };

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        await requestLocationPermission();
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            getNearbyRestaurants(latitude, longitude);
          },
          error => {
            console.error('Error getting current location:', error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } catch (error) {
        console.error('Error fetching current location:', error);
      }
    };

    fetchCurrentLocation();
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}>
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <ScrollView style={styles.modalContent}>
          <Text
            style={{
              justifyContent: 'center',
              fontSize: 24,
              flex: 1,
              fontWeight: 700,
              paddingBottom: 10,
            }}>
            Nearby Restaurants That You Can Check out
          </Text>
          {restaurants.map(restaurant => (
            <View
              key={restaurant.place_id}
              style={{
                borderWidth: 1,
                borderColor: '#20232a',
                marginBottom: 5,
                padding: 5,
              }}>
              <Text>Name: {restaurant.name}</Text>
              <Text>Address: {restaurant.vicinity}</Text>
              <Text>Rating: {restaurant.rating}</Text>
              <Text>
                Status:{' '}
                {restaurant.opening_hours?.open_now ? 'Open Now' : 'Closed'}
              </Text>
            </View>
          ))}
          <PrimaryButton title="Close" onPress={closeModal} />
        </ScrollView>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default RestaurantRecommendations;
