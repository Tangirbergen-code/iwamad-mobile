import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { events } from '../../src/data/events';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Event not found' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.subtitle}>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.detail}>Date: {event.date}</Text>
      <Text style={styles.detail}>Place: {event.place}</Text>
      <Text style={styles.detail}>Seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#666', marginTop: 4 },
  detail: { fontSize: 16, marginVertical: 4, color: '#444' },
});