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
import { POLLING_TRENDS } from '../data/mockData';

interface PollingTrendsScreenProps {
  onBack: () => void;
}

export const PollingTrendsScreen: React.FC<PollingTrendsScreenProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Polling Trends (Voter Turnout)</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.liveTag}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>Live Updates • Last refreshed a few moments ago</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {POLLING_TRENDS.map(trend => {
          const pct = trend.turnoutPercentage;
          const barColor = pct > 70 ? COLORS.success : pct > 50 ? COLORS.warning : COLORS.error;

          return (
            <View key={trend.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.constituency}>{trend.constituency}</Text>
                  <Text style={styles.state}>{trend.state}</Text>
                </View>
                <Text style={[styles.pct, { color: barColor }]}>{pct.toFixed(1)}%</Text>
              </View>

              {/* Turnout progress bar */}
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${pct}%` as any, backgroundColor: barColor }]} />
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statNum}>{trend.totalVoters.toLocaleString('en-IN')}</Text>
                  <Text style={styles.statLabel}>Total Voters</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNum}>{trend.votesCast.toLocaleString('en-IN')}</Text>
                  <Text style={styles.statLabel}>Votes Cast</Text>
                </View>
              </View>

              {/* Gender breakdown */}
              <View style={styles.genderRow}>
                <View style={styles.genderItem}>
                  <MaterialCommunityIcons name="gender-male" size={14} color={COLORS.info} />
                  <Text style={styles.genderText}>
                    {trend.maleVoters?.toLocaleString('en-IN')} Male
                  </Text>
                </View>
                <View style={styles.genderItem}>
                  <MaterialCommunityIcons name="gender-female" size={14} color='#E91E63' />
                  <Text style={styles.genderText}>
                    {trend.femaleVoters?.toLocaleString('en-IN')} Female
                  </Text>
                </View>
                {(trend.thirdGenderVoters ?? 0) > 0 && (
                  <View style={styles.genderItem}>
                    <MaterialCommunityIcons name="gender-non-binary" size={14} color="#FF9800" />
                    <Text style={styles.genderText}>
                      {trend.thirdGenderVoters} Others
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
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
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE0B2',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  liveText: { fontSize: 12, color: '#E64A19', fontWeight: '600' },
  scroll: { padding: 12, gap: 12, paddingBottom: 30 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    gap: 10,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  constituency: { fontSize: 15, fontWeight: '700', color: '#222' },
  state: { fontSize: 12, color: '#777', marginTop: 2 },
  pct: { fontSize: 22, fontWeight: '800' },
  barTrack: {
    height: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: 10,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  statNum: { fontSize: 15, fontWeight: '700', color: '#222' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  genderRow: {
    flexDirection: 'row',
    gap: 14,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  genderItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  genderText: { fontSize: 12, color: '#555' },
});
