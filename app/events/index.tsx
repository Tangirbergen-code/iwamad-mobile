import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { events } from '../../src/data/events';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((savedId) => savedId !== id) : [...prev, id]
    );
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search events"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSave(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No events match</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  infoText: { fontSize: 14, color: '#333', marginBottom: 8 },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#888', fontSize: 16 },
});