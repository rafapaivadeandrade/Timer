import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../components/Button';
const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Timer</Text>
      <Button
        style={styles.btn}
        onPress={() => props.navigation.navigate('EMOMScreen')}>
        EMOM
      </Button>
      <Button
        style={styles.btn}
        onPress={() => props.navigation.navigate('AMRAPScreen')}>
        AMRAP
      </Button>
      <Button
        style={styles.btn}
        onPress={() => props.navigation.navigate('IsometryScreen')}>
        Isometry
      </Button>
      <Button
        style={styles.btn}
        onPress={() => props.navigation.navigate('AboutScreen')}>
        About
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#D6304A'},
  logo: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 48,
    textAlign: 'center',
    color: 'white',
    marginTop: 111,
    marginBottom: 111,
  },
  btn: {padding: 20},
});
export default HomeScreen;
