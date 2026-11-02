import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { CANDIDATES } from '../data/mockData';
import { Candidate } from '../types';

interface KnowYourCandidatesScreenProps {
  onBack: () => void;
}

export const KnowYourCandidatesScreen: React.FC<KnowYourCandidatesScreenProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const filtered = CANDIDATES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.constituency.toLowerCase().includes(search.toLowerCase()) ||
    c.party.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Know Your Candidates</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, constituency or party..."
          placeholderTextColor="#AAAAAA"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {filtered.map(cand => {
          const getPartyColor = (p: string) => {
            if (p === 'BJP') return '#FF6B35';
            if (p === 'INC') return '#0078D4';
            if (p === 'AAP') return '#26C6DA';
            if (p === 'BSP') return '#3949AB';
            return '#888';
          };
          return (
            <TouchableOpacity
              key={cand.id}
              style={styles.card}
              onPress={() => setSelectedCandidate(selectedCandidate?.id === cand.id ? null : cand)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{cand.name.split(' ').map(n => n[0]).join('')}</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.candName}>{cand.name}</Text>
                  <View style={[styles.partyPill, { backgroundColor: getPartyColor(cand.party) }]}>
                    <Text style={styles.partyText}>{cand.party}</Text>
                  </View>
                  <Text style={styles.constituency}>{cand.constituency}, {cand.state}</Text>
                </View>
                <MaterialCommunityIcons
                  name={selectedCandidate?.id === cand.id ? 'chevron-up' : 'chevron-down'}
                  size={22}
                  color="#999"
                />
              </View>

              {selectedCandidate?.id === cand.id && (
                <View style={styles.detailsBox}>
                  {[
                    { label: 'Age', value: `${cand.age} years` },
                    { label: 'Education', value: cand.education || 'Not declared' },
                    { label: 'Criminal Cases', value: cand.criminalCases === 0 ? '0 (Clean record)' : `${cand.criminalCases} case(s)` },
                    { label: 'Assets', value: cand.assets || 'Not declared' },
                    { label: 'Liabilities', value: cand.liabilities || 'Not declared' },
                  ].map(row => (
                    <View key={row.label} style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{row.label}</Text>
                      <Text style={[
                        styles.detailValue,
                        row.label === 'Criminal Cases' && cand.criminalCases! > 0 && { color: COLORS.error }
                      ]}>
                        {row.value}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
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
  headerTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    margin: 12,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchInput: { flex: 1, color: '#333', fontSize: 14 },
  list: { paddingHorizontal: 12, paddingBottom: 20, gap: 12 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  cardInfo: { flex: 1, gap: 3 },
  candName: { fontSize: 15, fontWeight: '700', color: '#222' },
  partyPill: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  partyText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  constituency: { fontSize: 12, color: '#777' },
  detailsBox: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
    gap: 8,
  },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailLabel: { fontSize: 13, color: '#777', fontWeight: '500' },
  detailValue: { fontSize: 13, color: '#222', fontWeight: '600' },
});
