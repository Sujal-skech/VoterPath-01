import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { PAST_ELECTIONS, VOTER_FORMS } from '../data/mockData';

// ---- Past Elections ----
export const PastElectionsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Past Elections</Text>
      <View style={{ width: 24 }} />
    </View>
    <ScrollView contentContainerStyle={styles.scroll}>
      {PAST_ELECTIONS.map(pe => (
        <View key={pe.id} style={styles.card}>
          <View style={styles.yearBadge}>
            <Text style={styles.yearText}>{pe.year}</Text>
          </View>
          <Text style={styles.elType}>{pe.type}</Text>
          <Text style={styles.winner}>
            <MaterialCommunityIcons name="trophy-outline" size={14} color="#F9A825" /> Winner: {pe.winner}
          </Text>
          <Text style={styles.detail}>Party: {pe.party}</Text>
          <Text style={styles.detail}>Location: {pe.constituency}, {pe.state}</Text>
          <Text style={styles.detail}>Votes: {pe.votes.toLocaleString('en-IN')}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

// ---- Voter Registration Forms ----
export const VoterRegistrationScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Voter Registration Forms</Text>
      <View style={{ width: 24 }} />
    </View>
    <ScrollView contentContainerStyle={styles.scroll}>
      {VOTER_FORMS.map(form => (
        <View key={form.formNumber} style={styles.card}>
          <View style={styles.formRow}>
            <View style={styles.formIconCircle}>
              <MaterialCommunityIcons name={form.icon as any} size={26} color={COLORS.primary} />
            </View>
            <View style={styles.formInfo}>
              <Text style={styles.formName}>{form.formName}</Text>
              <Text style={styles.formPurpose}>{form.purpose}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={() => Alert.alert('Download', `Downloading ${form.formName}...`)}
          >
            <MaterialCommunityIcons name="download-outline" size={16} color="#FFFFFF" />
            <Text style={styles.downloadBtnText}>Download Form {form.formNumber}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  </View>
);

// ---- Track Application ----
export const TrackApplicationScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [appId, setAppId] = React.useState('');
  const [result, setResult] = React.useState<null | { status: string; date: string }>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Your Application</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.trackContent}>
        <MaterialCommunityIcons name="progress-check" size={64} color={COLORS.primary} />
        <Text style={styles.trackTitle}>Track Voter Registration Status</Text>
        <Text style={styles.trackSub}>
          Enter your Reference ID / Application ID to check the status of your voter registration.
        </Text>
        <View style={styles.trackInput}>
          <MaterialCommunityIcons name="card-search-outline" size={18} color="#999" />
          <Text style={{ flex: 1, color: '#AAAAAA', fontSize: 14 }}>Enter Reference ID</Text>
        </View>
        <TouchableOpacity
          style={styles.trackBtn}
          onPress={() => setResult({ status: 'Under Review', date: '2026-11-01' })}
        >
          <Text style={styles.trackBtnText}>Check Status</Text>
        </TouchableOpacity>
        {result && (
          <View style={styles.resultBox}>
            <MaterialCommunityIcons name="information-outline" size={20} color={COLORS.info} />
            <View>
              <Text style={styles.resultStatus}>Status: {result.status}</Text>
              <Text style={styles.resultDate}>Last Updated: {result.date}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

// ---- Generic Coming Soon ----
export const ComingSoonScreen: React.FC<{ onBack: () => void; title: string }> = ({ onBack, title }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 24 }} />
    </View>
    <View style={styles.comingSoon}>
      <MaterialCommunityIcons name="tools" size={72} color={COLORS.primaryLight} />
      <Text style={styles.comingSoonTitle}>Coming Soon</Text>
      <Text style={styles.comingSoonSub}>
        This feature will be available in the next release. Stay tuned for updates!
      </Text>
      <TouchableOpacity style={styles.backBtnLarge} onPress={onBack}>
        <Text style={styles.backBtnText}>← Go Back</Text>
      </TouchableOpacity>
    </View>
  </View>
);

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
    gap: 8,
  },
  yearBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  yearText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  elType: { fontSize: 16, fontWeight: '700', color: '#222' },
  winner: { fontSize: 13, color: '#333', fontWeight: '600' },
  detail: { fontSize: 13, color: '#666' },
  formRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  formIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EDE7F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInfo: { flex: 1 },
  formName: { fontSize: 14, fontWeight: '700', color: '#222' },
  formPurpose: { fontSize: 12, color: '#777', marginTop: 3, lineHeight: 17 },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 4,
  },
  downloadBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  trackContent: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  trackTitle: { fontSize: 18, fontWeight: '700', color: '#222', textAlign: 'center' },
  trackSub: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 18 },
  trackInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 1,
  },
  trackBtn: {
    backgroundColor: COLORS.primary,
    width: '100%',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  trackBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  resultBox: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    width: '100%',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  resultStatus: { fontSize: 14, fontWeight: '700', color: '#1565C0' },
  resultDate: { fontSize: 12, color: '#555', marginTop: 2 },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 16,
  },
  comingSoonTitle: { fontSize: 22, fontWeight: '700', color: '#333' },
  comingSoonSub: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 20 },
  backBtnLarge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  backBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});
