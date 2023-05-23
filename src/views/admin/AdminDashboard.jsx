import React from 'react';
import WebView from 'react-native-webview';
import {View} from 'react-native';

const AdminDashboard = () => {
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
