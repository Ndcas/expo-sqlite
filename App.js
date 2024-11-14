import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import db from './db';
import { useEffect, useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    db.findAll().then((result) => {
      console.log(result);
      setCount(result.length);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{count}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
