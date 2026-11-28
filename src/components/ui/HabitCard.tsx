import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HabitType } from '../../types/habit';

const HabitCard = ({
  habit,
  onToggle,
}: {
  onToggle: (id: number) => void;
  habit: HabitType;
}): ReactNode => {
  return (
    <View style={styles.habitCard}>
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
        onPress={() => onToggle(habit.id)}
        hitSlop={10}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: habit.completed }}
      >
        <Text style={styles.checkmarkText}>{habit.completed ? '✓' : ''}</Text>
      </Pressable>
    </View>
  );
};

export default HabitCard;

const styles = StyleSheet.create({
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
    marginRight: 12,
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
    fontSize: 13,
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
});
