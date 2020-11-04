import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Select from '../components/Select';
import Title from '../components/Title';
import Time from '../components/Time';
import ProgressBar from '../components/ProgressBar';
import BackgroundProgress from '../components/BackgroundProgress';
import Sound from 'react-native-sound';
import KeepAwake from 'react-native-keep-awake';

const alert = require('../../assets/alert.wav');

class AMRAPScreen extends Component {
  state = {
    alerts: [0, 15],
    countdown: 0,
    time: '2',
    paused: false,
    isRunning: false,
    countdownValue: 0,
    count: 0,
    repetitions: 0,
  };
  componentDidMount() {
    Sound.setCategory('Playback', true);
    this.alert = new Sound(alert);
  }
  playAlert = () => {
    const rest = this.state.count % 60;
    if (this.state.alerts.indexOf(rest) >= 0) {
      this.alert.play();
    }
    if (this.state.countdown === 1) {
      if (rest >= 55 && rest < 60) {
        this.alert.play();
      }
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
    clearInterval(this.countdownTimer);
    clearInterval(this.countTimer);
    this.setState({
      paused: !this.state.paused,
    });
  };
  play = () => {
    this.setState({
      paused: false,
      repetitions: 0,
      count: 0,
      countdownValue: this.state.countdown === 1 ? 5 : 0,
    });
    this.setState({isRunning: true});
    const count = () => {
      if (this.state.paused) return;
      this.setState({count: this.state.count + 1}, () => {
        this.playAlert();
        if (this.state.count === parseInt(this.state.time) * 60) {
          clearInterval(this.countTimer);
        }
      });
    };
    if (this.state.countdown === 1) {
      this.alert.play();
      this.countdownTimer = setInterval(() => {
        if (this.state.paused) return;
        this.alert.play();
        this.setState({countdownValue: this.state.countdownValue - 1}, () => {
          if (this.state.countdownValue === 0) {
            clearInterval(this.countdownTimer);
            this.countTimer = setInterval(count, 1000);
          }
        });
      }, 1000);
    } else {
      this.countTimer = setInterval(count, 1000);
    }
  };
  decrement = () => {
    if (this.state.repetitions > 0) {
      this.setState({repetitions: this.state.repetitions - 1});
    }
  };
  increment = () => {
    this.setState({repetitions: this.state.repetitions + 1});
  };
  render() {
    if (this.state.isRunning) {
      const perceMinute = parseInt(((this.state.count % 60) / 60) * 100);
      const percTime = parseInt(
        (this.state.count / 60 / parseInt(this.state.time)) * 100,
      );
      const media =
        this.state.repetitions > 0
          ? this.state.count / this.state.repetitions
          : 0;
      const estimated =
        media > 0 ? Math.floor((parseInt(this.state.time) * 60) / media) : 0;
      const opacity = !this.state.paused ? 0.6 : 1;

      return (
        <BackgroundProgress percentage={perceMinute}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <KeepAwake />
            <View style={{flex: 1}}>
              <Title
                title="AMRAP"
                subtitle="Every Repetitions as Possible"
                style={{paddingTop: 100}}
              />
            </View>
            {this.state.repetitions > 0 ? (
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Time time={media} type="text3" />
                  <Text style={styles.subtitle}>by repetition</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.count}>{estimated}</Text>
                  <Text style={styles.subtitle}>by repetition</Text>
                </View>
              </View>
            ) : null}
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Time time={this.state.count} />
              <ProgressBar percentage={percTime} />
              <Time
                time={parseInt(this.state.time) * 60 - this.state.count}
                type="text2"
                appendedText=" left"
              />
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 50}}>
              {this.state.countdownValue > 0 ? (
                <Text style={styles.countdown}>
                  {this.state.countdownValue}
                </Text>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginLeft: 30,
                  }}>
                  <TouchableOpacity onPress={this.decrement}>
                    <Text style={styles.countdown}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.countdown}>{this.state.repetitions}</Text>
                  <TouchableOpacity onPress={this.increment}>
                    <Text style={styles.countdown}>+</Text>
                  </TouchableOpacity>
                </View>
              )}

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
                    style={{opacity, marginTop: 20}}
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
                  style={{alignSelf: 'center', marginTop: 20}}>
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
          <Title
            title="AMRAP"
            subtitle="Every Repetitions as Possible"
            style={{paddingTop: 100}}
          />
          <Image
            style={{alignSelf: 'center', marginBottom: 17}}
            source={require('../../assets/settings-cog.png')}
          />
          <Select
            label="Alerts:"
            current={this.state.alerts}
            options={[
              {id: 0, label: '0s'},
              {id: 15, label: '15s'},
              {id: 30, label: '30s'},
              {id: 45, label: '45s'},
            ]}
            onSelect={(opt) => this.setState({countdown: opt})}
          />
          <Select
            label="Countdown:"
            current={this.state.alerts}
            options={[
              {id: 1, label: 'yes'},
              {id: 0, label: 'no'},
            ]}
            onSelect={(opt) => this.setState({countdown: opt})}
          />
          <Text style={styles.label}>How many minutes:</Text>
          <TextInput
            style={styles.input}
            value={this.state.time}
            onChangeText={(text) => this.setState({time: text})}
          />
          <Text style={styles.label}>minutes</Text>
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
  subtitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 11,
    textAlign: 'center',
    color: 'white',
  },
  count: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
  },
});
export default AMRAPScreen;
