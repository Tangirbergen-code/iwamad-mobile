import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { EventItem } from '../data/events';

interface EventRowProps {
  event: EventItem;
  isSaved: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

export default function EventRow({ event, isSaved, onPress, onLongPress }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.subtitle}>{event.date} • {event.place}</Text>
      </View>
      {isSaved && <Text style={styles.savedBadge}>Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 44,
    backgroundColor: '#fff',
  },
  cardPressed: {
    backgroundColor: '#e6f0ff',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  savedBadge: { color: 'green', fontWeight: 'bold', fontSize: 14 },
});