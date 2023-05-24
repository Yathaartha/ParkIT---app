import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {View} from 'react-native';
import Loading from '../Loading/Loading';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating the app loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Set the desired loading time here
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{
          uri: 'http://10.0.2.2:4005/public/dashboard/a5ec16c7-0f0b-4e41-bfd7-ff03b091148a',
          javascriptEnabled: true,
          domStorageEnabled: true,
        }}
        style={{flex: 1}}
      />
    </View>
  );
};

export default AdminDashboard;
