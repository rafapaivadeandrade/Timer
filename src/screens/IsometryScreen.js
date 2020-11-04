import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Select from '../components/Select';
import Title from '../components/Title';
import Time from '../components/Time';
import BackgroundProgress from '../components/BackgroundProgress';
import Sound from 'react-native-sound';
import KeepAwake from 'react-native-keep-awake';

const alert = require('../../assets/alert.wav');

class IsometryScreen extends Component {
  state = {
    goal: 1,
    countdown: 1,
    time: '20',
    isRunning: false,
    paused: false,
    countdownValue: 0,
    count: 0,
  };
  componentDidMount() {
    Sound.setCategory('Playback', true);
    this.alert = new Sound(alert);
  }
  playAlert = () => {
    const rest = 0;
    const {count, time} = this.state;
    if (count >= parseInt(time) - 5 && count <= parseInt(time)) {
      this.alert.play();
    }
  };
  restart = () => {
    if (this.state.paused) {
      clearInterval(this.countTimer);
      clearInterval(this.countdownTimer);
      this.play();
    }
  };
  back = () => {
    if (this.state.paused || !this.state.isRunning) {
      clearInterval(this.countTimer);
      clearInterval(this.countdownTimer);
      this.props.navigation.goBack();
    }
  };
  stop = () => {
    this.setState({
      paused: !this.state.paused,
    });
  };
  play = () => {
    const time = this.state.goal === 0 ? '0' : this.state.time;
    this.setState({
      count: 0,
      countdownValue: 5,
      paused: false,
      time,
    });
    this.setState({isRunning: true});
    const count = () => {
      if (this.state.paused) {
        return;
      }
      this.setState({count: this.state.count + 1}, () => {
        this.playAlert();
      });
    };
    this.alert.play();
    this.countdownTimer = setInterval(() => {
      if (this.state.paused) {
        return;
      }
      this.alert.play();
      this.setState({countdownValue: this.state.countdownValue - 1}, () => {
        if (this.state.countdownValue === 0) {
          clearInterval(this.countdownTimer);
          this.countTimer = setInterval(count, 1000);
        }
      });
    }, 1000);
  };
  render() {
    if (this.state.isRunning) {
      const perceMinute =
        this.state.time === '0'
          ? 0
          : parseInt((this.state.count / parseInt(this.state.time)) * 100);
      const rest =
        parseInt(this.state.time) >= this.state.count
          ? parseInt(this.state.time) - this.state.count
          : 0;
      const opacity = !this.state.paused ? 0.6 : 1;
      return (
        <BackgroundProgress percentage={perceMinute}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <KeepAwake />
            <View style={{flex: 1}}>
              <Title title="Isometry" style={{paddingTop: 100}} />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Time time={this.state.count} />
              {this.state.goal === 1 ? (
                <Time time={rest} type="text2" appendedText=" left" />
              ) : null}
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              {this.state.countdownValue > 0 ? (
                <Text style={styles.countdown}>
                  {this.state.countdownValue}
                </Text>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 40,
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={this.back}>
                  <Image
                    style={{opacity}}
                    source={require('../../assets/left-arrow.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={this.stop}>
                  {this.state.paused ? (
                    <Image source={require('../../assets/btn-play.png')} />
                  ) : (
                    <Image source={require('../../assets/btn-stop.png')} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.restart}
                  style={{alignSelf: 'center'}}>
                  <Image
                    style={{opacity}}
                    source={require('../../assets/restart.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BackgroundProgress>
      );
    }
    return (
      <KeyboardAvoidingView
        style={{flex: 1, width: Dimensions.get('screen').width}}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ScrollView style={styles.container}>
          <Title title="Isometry" style={{paddingTop: 100}} />
          <Image
            style={{alignSelf: 'center', marginBottom: 17}}
            source={require('../../assets/settings-cog.png')}
          />
          <Select
            label="Objective:"
            current={this.state.alerts}
            options={[
              {id: 0, label: 'free'},
              {id: 1, label: 'hit time'},
            ]}
            onSelect={(opt) => this.setState({goal: opt})}
          />
          {this.state.goal !== 0 ? (
            <>
              <Text style={styles.label}>How many seconds:</Text>
              <TextInput
                style={styles.input}
                value={this.state.time}
                onChangeText={(text) => this.setState({time: text})}
              />
            </>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 40,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={this.back}>
              <Image source={require('../../assets/left-arrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.play}>
              <Image source={require('../../assets/btn-play.png')} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6304A',
  },
  label: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
  },
  input: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 48,
  },
  countdown: {
    fontSize: 144,
    fontFamily: 'Ubuntu-Bold',
    color: 'white',
    textAlign: 'center',
  },
});
export default IsometryScreen;
