import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { ELECTIONS } from '../data/mockData';

interface CurrentElectionScreenProps {
  onBack: () => void;
}

export const CurrentElectionScreen: React.FC<CurrentElectionScreenProps> = ({ onBack }) => {
  const upcoming = ELECTIONS.filter(e => e.status === 'Upcoming');
  const completed = ELECTIONS.filter(e => e.status === 'Completed');

  const statusColor = (s: string) => {
    if (s === 'Upcoming') return { bg: '#E8F5E9', text: '#388E3C', border: '#66BB6A' };
    if (s === 'Ongoing') return { bg: '#FFF3E0', text: '#F57C00', border: '#FFB300' };
    return { bg: '#EEEEEE', text: '#757575', border: '#BDBDBD' };
  };

  const ElectionCard = ({ el }: { el: typeof ELECTIONS[0] }) => {
    const sc = statusColor(el.status);
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={[styles.statusPill, { backgroundColor: sc.bg, borderColor: sc.border }]}>
            <View style={[styles.statusDot, { backgroundColor: sc.text }]} />
            <Text style={[styles.statusText, { color: sc.text }]}>{el.status}</Text>
          </View>
          <View style={styles.typePill}>
            <Text style={styles.typeText}>{el.type}</Text>
          </View>
        </View>
        <Text style={styles.elTitle}>{el.title}</Text>
        <Text style={styles.elState}>{el.state}</Text>
        <View style={styles.dateRow}>
          <MaterialCommunityIcons name="calendar" size={14} color={COLORS.primary} />
          <Text style={styles.dateText}>Election: {el.electionDate}</Text>
          {el.phase && (
            <View style={styles.phasePill}>
              <Text style={styles.phaseText}>Phase {el.phase}</Text>
            </View>
          )}
        </View>
        {el.totalSeats && (
          <View style={styles.seatsRow}>
            <MaterialCommunityIcons name="seat-outline" size={14} color="#777" />
            <Text style={styles.seatsText}>{el.totalSeats} Seats</Text>
          </View>
        )}
        {el.resultDate && (
          <View style={styles.seatsRow}>
            <MaterialCommunityIcons name="flag-checkered" size={14} color="#777" />
            <Text style={styles.seatsText}>Results: {el.resultDate}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Current Elections</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {upcoming.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="calendar-clock" size={18} color={COLORS.success} />
              <Text style={styles.sectionTitle}>Upcoming Elections</Text>
            </View>
            {upcoming.map(el => <ElectionCard key={el.id} el={el} />)}
          </>
        )}
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="check-circle-outline" size={18} color="#888" />
          <Text style={styles.sectionTitle}>Recently Concluded</Text>
        </View>
        {completed.map(el => <ElectionCard key={el.id} el={el} />)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingTop: 46,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  scroll: { padding: 12, paddingBottom: 30, gap: 12 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
    marginTop: 4,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    gap: 6,
  },
  cardTop: { flexDirection: 'row', gap: 8, marginBottom: 2 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusDot: { width: 7, height: 7, borderRadius: 3.5 },
  statusText: { fontSize: 11, fontWeight: '700' },
  typePill: {
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  typeText: { fontSize: 11, fontWeight: '600', color: '#6A1B9A' },
  elTitle: { fontSize: 16, fontWeight: '700', color: '#222' },
  elState: { fontSize: 13, color: '#777' },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { fontSize: 13, color: '#555' },
  phasePill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  phaseText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  seatsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  seatsText: { fontSize: 13, color: '#555' },
});
