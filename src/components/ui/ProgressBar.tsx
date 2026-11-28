import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProgressBarProps {
  completedCount: number;
  totalCount: number;
}

const ProgressBar = ({ completedCount, totalCount }: ProgressBarProps): ReactNode => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Todays Progress</Text>
          <Text style={styles.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>

        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};
export default ProgressBar;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 2,
  },
  percentageText: {
    color: '#10B981',
    fontSize: 22,
    fontWeight: '700',
  },
  track: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    marginTop: 14,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
});
