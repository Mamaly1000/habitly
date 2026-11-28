import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import ProgressBar from './src/components/ui/ProgressBar';
import { mockHabits, HabitType } from './src/types/habit';
import HabitCard from './src/components/ui/HabitCard';
import { useState } from 'react';

export default function App() {
  const [habits, setHabits] = useState<HabitType[]>(mockHabits);

  const onAddHabit = () => {
    setHabits((p) => [
      ...p,
      {
        completed: false,
        description: 'this is new added habit',
        id: Math.random(),
        name: 'new habit name',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProgressBar
          completedCount={
            habits.filter((habit) => {
              return habit.completed;
            }).length
          }
          totalCount={habits.length}
        />
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
              onPress={onAddHabit}
            >
              <Text style={styles.addButtonText}>+ Add New Habit</Text>
            </Pressable>
          </View>
          {habits.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No habits yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap "+ Add New Habit" to create your first one!
              </Text>
            </View>
          ) : (
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={(id) => {
                  const updatedHabit = habits.find((h) => h.id === id);
                  if (updatedHabit) {
                    setHabits((p) =>
                      p.map((h) =>
                        h.id === updatedHabit.id ? { ...h, completed: !h.completed } : h
                      )
                    );
                  }
                }}
              />
            ))
          )}
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
  emptyContainer: {},
  emptyTitle: {},
  emptySubtitle: {},
});
