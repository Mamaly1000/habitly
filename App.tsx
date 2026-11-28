import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

export default function App() {
  const habits = [
    { id: 1, name: 'Walk a dog', description: 'Walk with your dog', completed: true },
    {
      id: 2,
      name: 'Eat breakfast',
      description: 'Eat a healthy breakfast',
      completed: false,
    },
    { id: 3, name: 'Drink 2L water', description: 'Drink 2L of water', completed: false },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <Text style={styles.progressTitle}>Todays's progress</Text>
          <Text style={styles.progressSubtitle}>2 of 3 completed</Text>
        </View>
        <View>
          <Text style={styles.title}>66%</Text>
        </View>
        <View style={{ height: 10, marginTop: 10, backgroundColor: '#334155', borderRadius: 10 }}>
          <View
            style={[
              { height: '100%', borderRadius: 10, backgroundColor: '#10B981' },
              { width: '66%' },
            ]}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Text style={styles.title}>Today's Habits</Text>
            <Pressable
              style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
              accessibilityRole="button"
              accessibilityLabel="add new habit"
              onPress={() => {
                console.log('add habit pressed!');
              }}
            >
              <Text style={styles.addButtonText}>+ Add New Habit</Text>
            </Pressable>
          </View>
          {habits.map((habit) => (
            <View key={habit.id} style={styles.habitCard}>
              <View style={styles.habitInfo}>
                <Text style={[styles.habitTitle, habit.completed && styles.habitTitleCompleted]}>
                  {habit.name}
                </Text>
                <Text style={styles.habitDescription}>{habit.description}</Text>
              </View>
              <Pressable
                style={({ pressed }) => [
                  styles.checkbox,
                  pressed && styles.checkboxPressed,
                  habit.completed && styles.checkboxCompleted,
                ]}
                hitSlop={10}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: habit.completed }}
              >
                <Text style={styles.checkmarkText}>{habit.completed ? '✓' : ''}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 32,
  },
  title: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 24,
  },
  dateText: {
    color: '#9CA3AF',
    marginBottom: 10,
    fontSize: 18,
  },
  progressTitle: {
    color: '#fff',
  },
  progressSubtitle: {
    color: '#fff',
  },
  habitCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  habitInfo: {
    flex: 1,
  },
  habitTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  habitTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  habitDescription: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkboxPressed: {
    opacity: 0.8,
  },
  checkmarkText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#10B981', // Or your favorite accent color
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }], // Nice subtle native tactile press effect!
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
