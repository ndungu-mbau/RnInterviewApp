import {useCallback, useEffect, useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default function App() {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => setSecondsPassed(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggle = useCallback(() => setIsActive(!isActive));
  const reset = useCallback(() => {
    setIsActive(false);
    setSecondsPassed(0);
  });

  const {minutes, seconds} = useMemo(() => {
    const minutes = Math.floor(secondsPassed / 60);
    const seconds = secondsPassed % 60;

    return {
      minutes,
      seconds,
    };
  }, [secondsPassed]);

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
