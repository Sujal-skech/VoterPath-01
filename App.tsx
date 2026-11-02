import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Theme
import { COLORS } from './src/theme/colors';

// Data
import { VOTER_SERVICE_CARDS, CONDUCT_ELECTION_CARDS } from './src/data/mockData';

// Components
import { ECIHeader } from './src/components/ECIHeader';
import { ServiceGrid } from './src/components/ServiceGrid';

// Screens
import { CVIGILScreen } from './src/screens/CVIGILScreen';
import { KnowYourCandidatesScreen } from './src/screens/KnowYourCandidatesScreen';
import { CurrentElectionScreen } from './src/screens/CurrentElectionScreen';
import { PollingTrendsScreen } from './src/screens/PollingTrendsScreen';
import {
  PastElectionsScreen,
  VoterRegistrationScreen,
  TrackApplicationScreen,
  ComingSoonScreen,
} from './src/screens/ServiceScreens';

type MainTab = 'voter_services' | 'conduct_election';
type ActiveScreen = string | null;

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('voter_services');
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>(null);
  const [welcomeName] = useState('Voter');

  // Navigate to a service screen
  const navigateTo = (screenId: string) => {
    setActiveScreen(screenId);
  };

  const navigateBack = () => {
    setActiveScreen(null);
  };

  // ── Screen Renderer ──────────────────────────────────────────
  const renderScreen = () => {
    switch (activeScreen) {
      // Conduct of Election
      case 'cvigil':
        return <CVIGILScreen onBack={navigateBack} />;
      case 'know_candidate':
        return <KnowYourCandidatesScreen onBack={navigateBack} />;
      case 'current_election':
        return <CurrentElectionScreen onBack={navigateBack} />;
      case 'polling_trends':
        return <PollingTrendsScreen onBack={navigateBack} />;
      case 'past_elections':
        return <PastElectionsScreen onBack={navigateBack} />;

      // Voter Services
      case 'reg_forms':
        return <VoterRegistrationScreen onBack={navigateBack} />;
      case 'track_application':
        return <TrackApplicationScreen onBack={navigateBack} />;

      // Generic Coming Soon for others
      case 'search_sir':
        return <ComingSoonScreen onBack={navigateBack} title="Search Name in Last SIR" />;
      case 'voter_complaints':
        return <ComingSoonScreen onBack={navigateBack} title="Voter Card Complaints" />;
      case 'download_epic':
        return <ComingSoonScreen onBack={navigateBack} title="Download e-Voter Card (e-EPIC)" />;
      case 'search_voter_list':
        return <ComingSoonScreen onBack={navigateBack} title="Search Name in Voter List" />;
      case 'call_blo':
        return <ComingSoonScreen onBack={navigateBack} title="Book a Call with BLO" />;
      case 'connect_officials':
        return <ComingSoonScreen onBack={navigateBack} title="Connect with Election Officials" />;
      case 'submit_appeal':
        return <ComingSoonScreen onBack={navigateBack} title="Submit / Track Appeal" />;
      case 'divyang_voter':
      case 'divyang':
        return <ComingSoonScreen onBack={navigateBack} title="Divyang (Saksham)" />;
      case 'suvidha':
        return <ComingSoonScreen onBack={navigateBack} title="Suvidha 2.0" />;

      default:
        return null;
    }
  };

  // ── Full Screen Mode ──────────────────────────────────────────
  if (activeScreen) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        {renderScreen()}
      </SafeAreaView>
    );
  }

  // ── Main Home Screen ──────────────────────────────────────────
  const currentCards =
    activeTab === 'voter_services' ? VOTER_SERVICE_CARDS : CONDUCT_ELECTION_CARDS;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* ECI Header */}
      <ECIHeader />

      {/* MCC Violation Alert Banner */}
      <View style={styles.mccBanner}>
        <MaterialCommunityIcons name="alert-circle" size={16} color="#FFFFFF" />
        <Text style={styles.mccBannerText}>Model Code of Conduct (MCC) Violation? Report via cVIGIL</Text>
        <TouchableOpacity onPress={() => navigateTo('cvigil')}>
          <Text style={styles.mccReportBtn}>Report →</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Banner */}
      <View style={styles.welcomeRow}>
        <Text style={styles.welcomeText}>Welcome, {welcomeName} 👋</Text>
        <View style={styles.notifBadge}>
          <MaterialCommunityIcons name="bell" size={18} color={COLORS.primary} />
          <View style={styles.notifDot} />
        </View>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'voter_services' && styles.tabActive]}
          onPress={() => setActiveTab('voter_services')}
        >
          <Text style={[styles.tabText, activeTab === 'voter_services' && styles.tabTextActive]}>
            Voter Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'conduct_election' && styles.tabActive]}
          onPress={() => setActiveTab('conduct_election')}
        >
          <Text style={[styles.tabText, activeTab === 'conduct_election' && styles.tabTextActive]}>
            Conduct of Election
          </Text>
        </TouchableOpacity>
      </View>

      {/* Service Grid */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ServiceGrid
          items={currentCards}
          onPress={navigateTo}
          columns={2}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  // MCC Banner
  mccBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F57C00',
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  mccBannerText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  mccReportBtn: {
    color: '#FFF9C4',
    fontWeight: '800',
    fontSize: 12,
  },

  // Welcome
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  notifBadge: { position: 'relative' },
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingHorizontal: 12,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    borderRadius: 4,
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#999999',
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  // Scroll
  scrollArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 30,
  },
});
