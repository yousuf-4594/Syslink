import React from 'react';
import { Text, ScrollView, StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import Tabs from './navigation/tabs';
import ABC from './CustomModule';

const App = () => {
  // const hello = ABC.show();
  // console.log(hello);

  // ABC.executeCommand("192.168.100.23","yousuf","123","cd ~/Desktop ; touch jojo.txt");
  // var value = ABC.ParentConnectionStatus("192.168.100.3","yousuf","hibban10");
  // console.log(value);
  return (
    
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    

  );
}

export default App;