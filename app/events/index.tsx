import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((savedId) => savedId !== id) : [...prev, id]
    );
  };

  if (isPending) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.stateText}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.errorMessage}>{error?.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const filteredEvents = (data || []).filter((e) =>
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
        refreshing={isRefetching}
        onRefresh={() => refetch()}
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
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  stateText: { marginTop: 10, fontSize: 16, color: '#666' },
  errorTitle: { fontSize: 18, fontWeight: 'bold', color: '#d9534f', marginBottom: 8 },
  errorMessage: { fontSize: 14, color: '#666', marginBottom: 16, textAlign: 'center' },
  retryButton: {
    minHeight: 44,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
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