import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

const AboutScreen = (props) => {
  const back = () => {
    props.navigation.goBack();
  };
  const openUrl = (url) => () => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Timer</Text>
      <Text style={styles.description}>
        This app was built on purpose of calculating the time.
      </Text>
      <TouchableOpacity
        onPress={openUrl('https://en.wikipedia.org/wiki/Timer')}>
        <Text style={styles.description}>Timer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openUrl('https://reactjs.org/')}>
        <Image source={require('../../assets/devreactjs.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={back}>
        <Image source={require('../../assets/left-arrow.png')} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6304A',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logo: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 48,
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
  },
  description: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    color: 'white',
    margin: 20,
  },
});
export default AboutScreen;
