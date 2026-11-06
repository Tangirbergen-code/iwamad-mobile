import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.subtitle}>Tangirbergen Baichalov</Text>

      <Pressable style={styles.button} onPress={() => setLikes(likes + 1)}>
        <Text style={styles.buttonText}>Like: {likes}</Text>
      </Pressable>

      <Link href="/events" asChild>
  <Pressable style={{ ...styles.button, marginTop: 15 }}>
    <Text style={styles.buttonText}>Events</Text>
  </Pressable>
</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});