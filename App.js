import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import {createAppContainer, createNavigationContainer} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import EMOMScreen from './src/screens/EMOMScreen';
import IsometryScreen from './src/screens/IsometryScreen';
import AMRAPScreen from './src/screens/AMRAPScreen';
import About from './src/screens/AboutScreen';
const {Navigator, Screen} = createStackNavigator();

function AppNavigator() {
  return (
    <>
      <StatusBar backgroundColor="#D6304A" />
      <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
          <Screen name="HomeScreen" component={HomeScreen} />
          <Screen name="AboutScreen" component={About} />
          <Screen name="AMRAPScreen" component={AMRAPScreen} />
          <Screen name="EMOMScreen" component={EMOMScreen} />
          <Screen name="IsometryScreen" component={IsometryScreen} />
        </Navigator>
      </NavigationContainer>
    </>
  );
}

export default AppNavigator;
