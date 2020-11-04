import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
const Title = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {paddingBottom: 20, paddingBottom: 20},
  title: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 48,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});
export default Title;
