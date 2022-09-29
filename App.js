import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {useTimer} from './use-timer';

export default function App() {
  //Import our custom hook, and destructure the values we need
  const {minutes, seconds, toggle, reset} = useTimer();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.timerText}>
        {minutes} : {seconds}
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonStart]}
        onPress={toggle}>
        <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonReset]}
        onPress={reset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 42,
  },
  button: {
    margin: 12,
    padding: 8,
    borderWidth: 8,
    borderColor: '#fff',
    borderRadius: 8,
  },
  buttonStart: {
    backgroundColor: '#41B0F1',
  },
  buttonReset: {
    backgroundColor: '#FF2D37',
  },
  buttonText: {
    color: '#fff',
    fontSize: 36,
  },
  timerText: {
    color: '#fff',
    fontSize: 52,
  },
});
