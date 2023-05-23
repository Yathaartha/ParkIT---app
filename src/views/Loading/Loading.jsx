import React from 'react';
import {View, ActivityIndicator, StyleSheet, Image} from 'react-native';
import logo from '../../assets/images/logo.png';
import styled from 'styled-components';

const Logo = styled.Image`
  width: 150px;
`;

const Loading = () => {
  return (
    <View style={styles.container}>
      <Logo source={logo} resizeMode="contain" />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
