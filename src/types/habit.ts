export type HabitType = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
};

export const mockHabits: HabitType[] = [
  { id: 1, name: 'Walk a dog', description: 'Walk with your dog', completed: true },
  {
    id: 2,
    name: 'Eat breakfast',
    description: 'Eat a healthy breakfast',
    completed: false,
  },
  { id: 3, name: 'Drink 2L water', description: 'Drink 2L of water', completed: false },
];
