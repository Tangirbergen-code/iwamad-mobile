import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
  
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      {/*  Элемент Hello, World! */}
      <Text style={styles.title}>Hello, World!</Text>
      
      
      <Text style={styles.title}>Baichalov Tangirbergen</Text>
      
      {/*  Отображение количества лайков */}
      <Text style={styles.title}>Likes: {likes}</Text>
      
      {/* Like */}
      <Pressable onPress={() => setLikes(likes + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>
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
  title: {
    fontSize: 32, 
    marginBottom: 10,
  },
  button: {
    minHeight: 44, 
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});